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
import PartEnum from "../../enumeration/PartEnum";
import TypeEnum from "../../enumeration/TypeEnum";
import FocusEnum from "../../enumeration/FocusEnum";

function ActivityList({history}) {
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
      title: "Bloco",
      field: "part",
      render: rowData => PartEnum[rowData.part].name
    },
    {
      title: "Tipo",
      field: "type",
      render: rowData => TypeEnum[rowData.type].name
    },
    {
      title: "Foco",
      field: "focus",
      render: rowData => FocusEnum[rowData.focus].name
    },
    { title: "Objetivo", field: "goal" }
  ]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [activities, setActivitys] = React.useState([]);
  const [activity, setActivity] = React.useState();

  React.useEffect(() => {
    loadActivitys();
  }, []);

  async function loadActivitys() {
    const response = await api.get("v1/activities/");
    setActivitys(response.data);
  }

  async function deleteData(id) {
    const response = await api.delete("v1/activities/" + id);

    if (response.status === 200) {
      let filteredActivitys = activities.filter(activity => activity.id !== id);
      setActivitys(filteredActivitys);
    }
  }

  const handleEdit = activity => {
    history.push("/activity/edit/" + activity.id);
  };

  const handleClickDialog = activity => {
    setActivity(activity);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmedDelete = () => {
    deleteData(activity.id);
    handleClose();
  };

  const handleNew = () => {
    history.push("/activity/create");
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
              <h4 className={classes.cardTitleWhite}>Atividade</h4>
              <p className={classes.cardCategoryWhite}>Atividade de futebol</p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                title="Atividades"
                columns={columns}
                data={activities}
                actions={[
                  {
                    icon: "delete",
                    tooltip: "Excluir",
                    onClick: (event, activity) => {
                      handleClickDialog(activity);
                    }
                  },
                  {
                    icon: "edit",
                    tooltip: "Editar",
                    onClick: (event, activity) => {
                      handleEdit(activity);
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

export default ActivityList;
