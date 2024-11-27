const CorsOptions = {
  origin: ["http://localhost", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

export { CorsOptions };
