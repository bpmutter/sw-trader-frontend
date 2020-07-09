import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import appContext from "./Context";
import Input from "./Input";
import { Words, Button, Content, Heading } from "arwes";
import Frame from "arwes/lib/Frame";
import SelectOption from "./Select";
import Radio from "./Radio";
import LabelText from "./LabelText";
import Textarea from "./Textarea";

const SignUp = () => {
  const style = {
    container: {
      padding: "2rem",
      maxWidth: 600,
      margin: "0 auto",
    },
    title: {
      textAlign: "center",
      margin: "1rem",
    },
    contentWrapper: {
      margin: "1rem",
    },
  };

  const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState(1);
  const [bio, setBio] = useState("");
  const [faction, setFaction] = useState("rebellion");
  const [speciesOptions, setSpeciesOptions] = useState([]);

  const [errors, setErrors] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const { id, logout } = useContext(appContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:5000/users/${id}`);
      const {user} = await res.json();
      setName(user.name);
      setEmail(user.email);
      setSpecies(user.species);
      setBio(user.bio);
      setFaction( user.faction ? "rebellion" : "empire");

      const res2 = await fetch("http://localhost:5000/users/species");
      const { species } = await res2.json();
      setSpeciesOptions(species);
    })();
  }, [id]);

  const setFormValues = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    // else if (e.target.name === "password") setPassword(e.target.value);
    // else if (e.target.name === "confirmPassword")
    //   setConfirmPassword(e.target.value);
    else if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "species") setSpecies(e.target.value);
    else if (e.target.name === "bio") setBio(e.target.value);
    else if (e.target.name === "faction") {
      if (e.target.value === "rebellion") setFaction("rebellion");
      else setFaction("empire");
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    console.table(
      email,
      name,
      species,
      bio,
      faction
    );
    // if (password !== confirmPassword) {
    //   setErrors(
    //     "It looks like you entered 2 different passwords. Please reenter your password the same in both fields and try again."
    //   );
    //   setPassword("");
    //   setConfirmPassword("");
    //   document.getElementsByName("password")[0].value = "";
    //   document.getElementsByName("confirmPassword")[0].value = "";
    // }

    // try {
    //   const res = await fetch("http://localhost:5000/users/update", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email,
    //     //   password,
    //       name,
    //       species,
    //       bio,
    //       faction: faction === "rebellion",
    //       user_image:
    //         "https://upload.wikimedia.org/wikipedia/en/4/4b/Jjportrait.jpg",
    //     }),
    //   });
    // } 
    // catch (err) {
    //   alert(
    //     "Oh no, it looks like there was some force interference causing problems with our server. Please try again later."
    //   );
    // }
  };
  const updateProfile = () =>{
      console.log("update profile!")
  }
  const deleteAccount = async () => {
      console.log("delete account!!");
      const res = await fetch(`http://localhost:5000/users/${id}`)
      logout();
      setLoggedIn(false)
  }
  return (
    <div>
        {!loggedIn ? <Redirect to="/"/> : (
        <Content style={style.container}>
          <Frame animate level={3} corners={4} style={style.frame}>
            <div style={style.contentWrapper}>
              <Heading node="h2" style={style.title}>
                Edit Profile
              </Heading>
              <div
                style={{ padding: ".75rem .75rem 1.5rem", textAlign: "center" }}
              >
                <Words animate layer="alert">
                  {errors ? errors : " "}
                </Words>
              </div>
              <div>
                <form onSubmit={submitForm} style={style.loginForm}>
                  <Input
                    label="Email: "
                    type="email"
                    name="email"
                    onChange={setFormValues}
                    required
                    value={email}
                  />
                  <Input
                    label="Name: "
                    type="text"
                    name="name"
                    onChange={setFormValues}
                    required
                    value={name}
                  />

                  {/* <Input
                    label="Password: "
                    type="password"
                    name="password"
                    onChange={setFormValues}
                    required
                  />
                  <Input
                    label="Confirm password: "
                    type="password"
                    name="confirmPassword"
                    onChange={setFormValues}
                    required
                  /> */}
                  <SelectOption
                    label="Species: "
                    name="species"
                    onChange={setFormValues}
                    options={speciesOptions}
                    optionValueId={"id"}
                    optionInnerContent={"species_type"}
                    required
                    selected={species}
                  />
                  <p style={{ padding: ".5rem 0" }}>
                    <LabelText label="Faction: " required />
                    <Radio
                      name="faction"
                      value="rebellion"
                      checked={faction === "rebellion"}
                      onChange={setFormValues}
                      label="Rebellion"
                    />
                    <Radio
                      name="faction"
                      value="empire"
                      checked={faction === "empire"}
                      onChange={setFormValues}
                      label="Empire"
                    />
                  </p>
                  <Textarea
                    label="Bio: "
                    type="textarea"
                    name="bio"
                    onChange={setFormValues}
                    required
                    value={bio}
                  />
                  <p style={{ marginTop: '2rem', textAlign: "center", display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={updateProfile}>Update Profile</Button>
                    <Button layer='alert' onClick={deleteAccount}>Delete Account</Button>
                  </p>
                </form>
              </div>
            </div>
          </Frame>
        </Content>)}
    </div>
  );
};

export default SignUp;