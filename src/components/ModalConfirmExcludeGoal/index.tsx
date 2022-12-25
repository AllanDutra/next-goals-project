import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

import firebase from "../../services/firebaseConnection";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { Notify } from "../../utils/Notify";

export interface GoalInfoToDelete {
  id: string;
  title: string;
}

interface Props {
  goalInfoToDelete: GoalInfoToDelete;
  onClose(): void;
}

export function ModalConfirmExcludeGoal({ goalInfoToDelete, onClose }: Props) {
  const open = goalInfoToDelete.id !== "";

  const [isExcludingGoal, setIsExcludingGoal] = React.useState(false);

  function handleClose() {
    if (isExcludingGoal) return;

    onClose();
  }

  async function handleConfirmExcludeGoal(goalId: string) {
    if (isExcludingGoal) return;

    try {
      setIsExcludingGoal(true);

      await firebase.firestore().collection("goals").doc(goalId).delete();

      Notify.notifyOnReload({
        message: "Meta removida com sucesso!",
        type: "success",
      });
    } catch (err) {
      toast(`Não foi possível remover a meta, erro: ${JSON.stringify(err)}`);
    } finally {
      onClose();
      setIsExcludingGoal(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Excluir meta "{goalInfoToDelete.title}"?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A ação de excluir é permanente, sendo assim, não será mais possível
          acessar as informações desta meta.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isExcludingGoal}>
          Cancelar
        </Button>
        {isExcludingGoal ? (
          <div className={styles.progressContainer}>
            <CircularProgress size={30} />
          </div>
        ) : (
          <Button
            onClick={() => handleConfirmExcludeGoal(goalInfoToDelete.id)}
            autoFocus
          >
            Excluir
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
