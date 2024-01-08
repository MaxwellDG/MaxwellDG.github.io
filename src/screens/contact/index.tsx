import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Send");

  // I dunno. this doesn't do anything. It's just to show that somethings happening on form submit
  function mockDoSomethingWithForm() {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("message", message);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setButtonText("Received!");
    mockDoSomethingWithForm();
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => {
      setButtonText("Send");
    }, 5000);
  }

  return (
    <Box>
      <Typography variant="h2">Contact us</Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        Send us a message and we won't get back to you because this isn't real
      </Typography>
      <form onSubmit={handleSend}>
        <Box sx={styles.form}>
          <TextField
            id="Name"
            label="Name"
            value={name}
            autoComplete="off"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            variant="filled"
            required
            sx={styles.field}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            id="Email"
            label="Email"
            autoComplete="off"
            variant="filled"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            required
            type="email"
            sx={styles.field}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            id="Message"
            label="Message"
            autoComplete="off"
            variant="filled"
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
            }}
            required
            multiline={true}
            sx={styles.field}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <Button type="submit" sx={styles.button}>
            {buttonText}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
  },
  subtitle: {
    marginBottom: 5,
  },
  field: {
    color: "text.primary",
  },
  button: {
    bgcolor: "primary.light",
    color: "text.primary",
    marginTop: 5,
    ":hover": {
      bgcolor: 'primary.light',
      color: "white",
    },
  },
};
