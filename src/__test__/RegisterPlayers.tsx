
import { queryByAttribute, render, screen } from '@testing-library/react';
import App from "../components/App";


// testing exitsting of register player element

it("expect register-players element to be existed", ()=>{
    const view = render(<App />);
    const registerElement = queryByAttribute("class", view.container, "register-players");
    expect(registerElement).toBeInTheDocument();
});