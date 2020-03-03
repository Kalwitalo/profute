import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import MaterialTable from "material-table";
import CustomDialog from "components/CustomDialog/CustomDialog";
import api from "../../services/api";
import { format } from "date-fns";

function SessionList({history}) {
  const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };

  const [columns] = React.useState([
    {
      title: "Data",
      field: "date",
      render: rowData => format(new Date(rowData.date), "dd/MM/yyyy")
    },
    { title: "Objetivos", field: "goals" },
    { title: "Equipe", field: "team.name" }
  ]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [sessions, setSessions] = React.useState([]);
  const [session, setSession] = React.useState();

  React.useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    const response = await api.get("v1/sessions/");
    setSessions(response.data);
  }

  async function deleteData(id) {
    const response = await api.delete("v1/sessions/" + id)

    if (response.status === 200) {
      let filteredSessions = sessions.filter(session => session.id !== id)
      setSessions(filteredSessions);
    }
  }

  const handleEdit = session => {
    history.push("/session/edit/" + session.id);
  };

  const handleClickDialog = session => {
    setSession(session);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmedDelete = () => {
    deleteData(session.id);
    handleClose();
  };

  const handleNew = () => {
    history.push("/session/create");
  };

  const useStyles = makeStyles(styles);

  const classes = useStyles();
  return (
    <div>
      <Button color="success" onClick={handleNew}>
        Novo
      </Button>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Sessão</h4>
              <p className={classes.cardCategoryWhite}>
                Sessão de futebol
                </p>
            </CardHeader>
            <CardBody>
            <MaterialTable
              title="Sessões"
              columns={columns}
              data={sessions}
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Excluir',
                  onClick: (event, session) => {
                    handleClickDialog((session));
                  }
                },
                {
                  icon: 'edit',
                  tooltip: 'Editar',
                  onClick: (event, session) => {
                    handleEdit(session);
                  }
                }
              ]} />
              <CustomDialog 
                open={openDialog}
                handleClose={handleClose} 
                title="Excluir registro"
                contentText="Tem certeza que deseja excluir o registro"
                handleConfirmedDelete={handleConfirmedDelete}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}


export default SessionList;