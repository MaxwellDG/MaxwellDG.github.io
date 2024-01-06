import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if(formRef.current){
      formRef.current.reset()
    }
  }

  return (
    <Box>
      <Typography variant="h2">Contact us</Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        Send us a message and we won't get back to you because this isn't real
      </Typography>
      <form ref={formRef} onSubmit={handleSend}>
        <Box sx={styles.form}>
          <TextField
            label="Name"
            value={name}
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
            label="Email"
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
            label="Message"
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
          <Button type="submit" sx={styles.button}>Send</Button>
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
    fontFamily: 'Inter'
  },
  field: {
    color: "text.primary",
  },
  button: {
    bgcolor: 'primary.light',
    color: 'text.primary',
    marginTop: 5
  }
};
