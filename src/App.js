import "./App.css";
import { TodoPage } from "./Pages/TodoPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Todo } from "./Pages/Todo";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TodoPage />
        </Route>
        <Route exact path="/:id">
          <Todo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
