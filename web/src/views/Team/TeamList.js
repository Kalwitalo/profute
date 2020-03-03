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

function TeamList({history}) {
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

  const [columns] = React.useState([{ title: "Nome", field: "name" }]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [team, setTeam] = React.useState();

  React.useEffect(() => {
    loadTeams();
  }, []);


  async function loadTeams() {
    const response = await api.get("v1/teams/");
    setTeams(response.data);
  }

  async function deleteData(id) {
    const response = await api.delete("v1/teams/" + id)

    if (response.status === 200) {
      let filteredTeams = teams.filter(team => team.id !== id)
      setTeams(filteredTeams);
    }
  }

  const handleEdit = team => {
    history.push("/team/edit/" + team.id);
  }

  const handleClickDialog = team => {
    setTeam(team);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmedDelete = () => {
    deleteData(team.id);
    handleClose();
  };

  const handleNew = () => {
    history.push("/team/create");
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
              <h4 className={classes.cardTitleWhite}>Equipe</h4>
              <p className={classes.cardCategoryWhite}>Equipe de futebol</p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                title="Equipes"
                columns={columns}
                data={teams}
                actions={[
                  {
                    icon: "delete",
                    tooltip: "Excluir",
                    onClick: (event, team) => {
                      handleClickDialog(team);
                    }
                  },
                  {
                    icon: "edit",
                    tooltip: "Editar",
                    onClick: (event, team) => {
                      handleEdit(team);
                    }
                  }
                ]}
              />
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

export default TeamList;
