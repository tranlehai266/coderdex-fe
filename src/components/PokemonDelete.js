import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { deletePokemon } from "../features/pokemons/pokemonSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonDelete({ pokemon }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log(pokemon);
    dispatch(deletePokemon(pokemon));
    navigate("/");
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} fullWidth color="error" variant="contained">
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Are you sure delete ?
          </Typography>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginBottom: "10px" }}
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleClose}
          >
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
