// in-memory storage is used here, so all data will be lost when the server restarts
let confessions = []
let confessionIdCounter = 0

function createConfession(data) {
  // request data must exist to process a valid confession
  if (!data) {
    return { error: "bad", status: 400 }
  }

  // text is required because a confession without content is not meaningful
  if (!data.text) {
    return { error: "need text", status: 400 }
  }

  // prevent empty submissions to maintain data quality
  if (data.text.length === 0) {
    return { error: "too short", status: 400 }
  }

  // limit size to avoid abuse and large payload issues
  if (data.text.length >= 500) {
    return { error: "too long", status: 400 }
  }

  const allowedCategories = ["bug", "deadline", "imposter", "vibe-code"]

  // restrict category to predefined values to ensure consistency in stored data
  if (!allowedCategories.includes(data.category)) {
    return { error: "invalid category", status: 400 }
  }

  const newConfession = {
    // incrementing counter simulates unique ID generation without a database
    id: ++confessionIdCounter,
    text: data.text,
    category: data.category,
    created_at: new Date()
  }

  // storing the new confession in memory for later retrieval
  confessions.push(newConfession)

  // returning structured response allows controller to handle HTTP response cleanly
  return { data: newConfession, status: 201 }
}

module.exports = {
  createConfession
}