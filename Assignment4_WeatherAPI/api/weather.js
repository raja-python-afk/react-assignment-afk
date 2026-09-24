export default async function handler(req, res) {
  const city = req.query?.city?.trim();
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "Please enter a city" });
  if (!apiKey) return res.status(500).json({ error: "Weather API key is not configured on Vercel" });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) {
      const message = response.status === 404
        ? "City not found"
        : response.status === 401
        ? "OpenWeather API key is invalid or not activated"
        : data.message || "Unable to fetch weather";
      return res.status(response.status).json({ error: message });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Unable to connect to weather service" });
  }
}
