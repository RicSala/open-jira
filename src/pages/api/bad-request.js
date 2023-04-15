export default function handler(req, res) {
  // return a Bad request status code and message

  const { message = "Bad Request" } = req.query;

  res.status(400).json({ message });
}
