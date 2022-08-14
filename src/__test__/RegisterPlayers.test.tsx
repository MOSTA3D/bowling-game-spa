
import { fireEvent, queryByAttribute, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from "../components/App";
import RegisterPlayers from "../components/RegisterPlayers";
import store from "../store";


// testing exitsting of register player element

describe("testing register players component", ()=>{
    const view = render(<Provider store={store}><App /></Provider>);
    const inputElement = screen.getByPlaceholderText(/Enter Player Name/i) as HTMLInputElement;
    const startButton = screen.getByText(/start/i);

    it("expects register-players element to be existed", ()=>{
        // const registerElement = queryByAttribute("class", view.container, "register-players");
        expect(inputElement).toBeInTheDocument();
    });

    it("expects inputElement to render the same value that is provided in its value property", ()=>{
        fireEvent.change(inputElement, {target: {value: "some"}});
        expect(inputElement.value).toEqual("some");
    });

    it("expects doing nothing when clicking on start without providing players", ()=>{
        fireEvent.click(startButton);
        expect(window.location.pathname).toEqual("/register");
    })
});

