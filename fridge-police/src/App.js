import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Pizza",
      owner: "Alex",
      totalQuantity: 100,
      availableQuantity: 25,
      requests: []
    },
    {
      id: "2",
      name: "Ketchup",
      owner: "Sam",
      totalQuantity: 100,
      availableQuantity: 100,
      requests: []
    },
    {
      id: "3",
      name: "Ketchup",
      owner: "John",
      totalQuantity: 100,
      availableQuantity: 100,
      requests: []
    }
  ]);

  // ➕ Request food
  function requestItem(itemId, amount) {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            requests: [
              ...item.requests,
              {
                requestId: Date.now().toString(),
                user: "User" + Math.floor(Math.random() * 100),
                amount,
                status: "pending",
                createdAt: Date.now()
              }
            ]
          };
        }
        return item;
      })
    );
  }

  // ✅ Approve request (Concurrency handled here)
  function approveRequest(itemId, requestId) {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const request = item.requests.find(r => r.requestId === requestId);

          if (request.amount <= item.availableQuantity) {
            return {
              ...item,
              availableQuantity: item.availableQuantity - request.amount,
              requests: item.requests.map(r =>
                r.requestId === requestId
                  ? { ...r, status: "approved" }
                  : r
              )
            };
          } else {
            alert("Not enough quantity left");
            return {
              ...item,
              requests: item.requests.map(r =>
                r.requestId === requestId
                  ? { ...r, status: "rejected" }
                  : r
              )
            };
          }
        }
        return item;
      })
    );
  }

  // 🧟 Expiry logic
  function checkExpiry() {
    setItems(prev =>
      prev.map(item => ({
        ...item,
        requests: item.requests.map(req => {
          if (
            req.status === "approved" &&
            Date.now() - req.createdAt > 60000
          ) {
            return { ...req, status: "expired" };
          }
          return req;
        })
      }))
    );
  }

  // 👻 Reality fix
  function markAsGone(itemId) {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, availableQuantity: 0 }
          : item
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>FridgePolice</h1>

      <button onClick={checkExpiry}>Check Expiry</button>

      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{item.name} (ID: {item.id})</h3>
          <p>Owner: {item.owner}</p>
          <p>Available: {item.availableQuantity}%</p>

          <button onClick={() => requestItem(item.id, 25)}>
            Request 25%
          </button>

          <button onClick={() => markAsGone(item.id)}>
            Mark as Gone
          </button>

          <h4>Requests:</h4>

          {item.requests.map(req => (
            <div key={req.requestId}>
              <p>
                {req.user} requested {req.amount}% — {req.status}
              </p>

              {req.status === "pending" && (
                <button
                  onClick={() =>
                    approveRequest(item.id, req.requestId)
                  }
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;