import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api from "../../services/api";


function TeamForm({ history, match: {params} }) {
  const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [team, setTeam] = useState({
    date: new Date(),
    name: ""
  });

  React.useEffect(() => {
    const {id} = params;
    if (id) {
      findById(id);
    }
  }, [params]);

  async function findById(id) {
    const response = await api.get("v1/teams/" + id)
    if (response.status === 200) {
      setTeam(response.data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await saveTeam(team);
    
    if (response.status === 200) handleList();
    
  }
  
  function saveTeam(data) {
    if (data.id) {
      return api.put("v1/teams/" + data.id, data);
    }
    return api.post("v1/teams/", data);
  }

  function handleList() {
    history.push("/team/list");
  }
  

  return (
    <div>
      <Button color="success" onClick={handleList}>Listar</Button>
      <form onSubmit={handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Cadastrar Equipe</h4>
                <p className={classes.cardCategoryWhite}>Complete o cadastro da equipe</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Nome"
                      id="name"
                      value={team.name}
                      onChange={(e) => setTeam({...team, name: e.target.value})}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" type="submit">Salvar</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}

export default TeamForm;