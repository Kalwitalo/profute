import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // import
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import api from "../../services/api";

function SessionForm({ history, match: { params } }) {
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
    },
    formControl: {
      margin: 1,
      minWidth: 120
    },
    selectEmpty: {
      marginTop: 2
    }
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [session, setSession] = useState({
    team: PropTypes.object,
    date: new Date(),
    goals: ""
  });
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    const { id } = params;
    if (id) {
      findById(id);
    }

    loadTeams();
  }, [params]);

  const handleChangeTeams = event => {
    const team = teams.find(t => t.id === event.target.value);
    setSession({ ...session, team: team });
  };

  async function findById(id) {
    const response = await api.get("v1/sessions/" + id);
    if (response.status === 200) {
      setSession(response.data);
    }
  }

  async function loadTeams() {
    const response = await api.get("v1/teams/");
    setTeams(response.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(session);
    const response = await saveSession(session);

    if (response.status === 200) handleList();
  }

  function saveSession(data) {
    if (data.id) {
      return api.put("v1/sessions/" + data.id, data);
    }
    return api.post("v1/sessions/", data);
  }

  function handleList() {
    history.push("/session/list");
  }

  return (
    <div>
      <Button color="success" onClick={handleList}>
        Listar
      </Button>
      <form onSubmit={handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Cadastrar Sessão</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete o cadastro da sessão
                </p>
              </CardHeader>
              <CardBody>
                {teams.length > 0 ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>

                      <FormControl className={classes.formControl}>
                        <InputLabel id="teamLabel">Equipe</InputLabel>
                        <Select
                          id="team"
                          value={session.team.id || null}
                          onChange={handleChangeTeams}
                        >
                          {teams.map(team => (
                            <MenuItem key={team.id} value={team.id}>
                              {team.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                ) : null}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Data"
                        value={session.date}
                        onChange={(date) => setSession({ ...session, date: date })}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Objetivo"
                      id="goals"
                      value={session.goals}
                      onChange={(e) => setSession({ ...session, goals: e.target.value })}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
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

export default SessionForm;