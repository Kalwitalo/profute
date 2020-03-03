import React, { useState } from "react";
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
import PartsEnum from "../../enumeration/PartEnum";
import TypeEnum from "../../enumeration/TypeEnum";
import FocusEnum from "../../enumeration/FocusEnum";

function ActivityForm({ history, match: { params } }) {
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
      fullWidth: true,
      display: "flex",
      marginTop: 15,
      minWidth: 120
    }
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [sessions, setSessions] = React.useState([]);
  const [activity, setActivity] = useState({
    part: "",
    type: "",
    focus: "",
    goal: "",
    time: 0,
    serie: 0,
    stop: 0,
    rules: "",
    description: "",
    session: PropTypes.object
  });

  React.useEffect(() => {
    loadSessions();
    const { id } = params;
    if (id) {
      findById(id);
    }
  }, [params]);

  const handleChangeSessions = event => {
    const session = sessions.find(s => s.id === event.target.value);
    setActivity({ ...activity, session: session });
  };

  async function findById(id) {
    const response = await api.get("v1/activities/" + id);
    if (response.status === 200) {
      setActivity(response.data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await saveActivity(activity);
    if (response.status === 200) handleList();
  }

  async function loadSessions() {
    const response = await api.get("v1/sessions/");
    setSessions(response.data);
  }

  function saveActivity(data) {
    if (data.id) {
      return api.put("v1/activities/" + data.id, data);
    }
    return api.post("v1/activities/", data);
  }

  function handleList() {
    history.push("/activity/list");
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
                <h4 className={classes.cardTitleWhite}>Cadastrar Atividade</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete o cadastro da atividade
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="teamLabel" htmlFor="team">Equipe</InputLabel>
                      <Select
                        id="team"
                        value={activity.session.id || 0}
                        onChange={handleChangeSessions}
                        autoWidth={true}
                      >
                        {sessions.map(session => (
                          <MenuItem key={session.id} value={session.id}>
                            {session.goals}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="partLabel">Bloco</InputLabel>
                      <Select
                        id="part"
                        value={activity.part}
                        onChange={e =>
                          setActivity({ ...activity, part: e.target.value })
                        }
                        autoWidth={true}
                      >
                        {Object.keys(PartsEnum).map(key => (
                          <MenuItem key={key} value={key}>
                            {PartsEnum[key].name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="typeLabel">Tipo</InputLabel>
                      <Select
                        id="type"
                        value={activity.type}
                        onChange={e =>
                          setActivity({ ...activity, type: e.target.value })
                        }
                        autoWidth={true}
                      >
                        {Object.keys(TypeEnum).map(key => (
                          <MenuItem key={key} value={key}>
                            {TypeEnum[key].name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={4} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="focusLabel">Foco</InputLabel>
                      <Select
                        id="focus"
                        value={activity.focus}
                        onChange={e =>
                          setActivity({ ...activity, focus: e.target.value })
                        }
                        autoWidth={true}
                      >
                        {Object.keys(FocusEnum).map(key => (
                          <MenuItem key={key} value={key}>
                            {FocusEnum[key].name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Objetivo"
                      id="goal"
                      value={activity.goal}
                      onChange={e =>
                        setActivity({ ...activity, goal: e.target.value })
                      }
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        maxLength: 500
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Tempo"
                      id="time"
                      value={activity.time}
                      onChange={e =>
                        setActivity({ ...activity, time: e.target.value })
                      }
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        type: "number"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Série"
                      id="serie"
                      value={activity.serie}
                      onChange={e =>
                        setActivity({ ...activity, serie: e.target.value })
                      }
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        type: "number"
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={4} md={4}>
                    <CustomInput
                      labelText="Pausa"
                      id="stop"
                      value={activity.stop}
                      onChange={e =>
                        setActivity({ ...activity, stop: e.target.value })
                      }
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        type: "number"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Regras"
                      id="rules"
                      value={activity.rules}
                      onChange={e =>
                        setActivity({ ...activity, rules: e.target.value })
                      }
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        maxLength: 5000
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Descrição"
                      id="description"
                      value={activity.description}
                      onChange={e =>
                        setActivity({
                          ...activity,
                          description: e.target.value
                        })
                      }
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        maxLength: 5000
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" type="submit">
                  Salvar
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}

export default ActivityForm;
