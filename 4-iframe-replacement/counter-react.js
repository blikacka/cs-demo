const Counter = ({
    name,
}) => {
    const [counter, setCounter] = React.useState(0)

    const increment = () => setCounter(counter + 1)
    const decrement = () => setCounter(counter - 1)

    return (
        <div style={{
            padding: '10px',
            margin: '10px',
            border: '1px solid black',
        }}>
            Počítadlo {name}
            <p>{counter}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}

const ReactApp = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
        }}>
            <div>
                <Counter name="1" />
            </div>

            <div>
                <Counter name="2" />
            </div>

            <div>
                <Counter name="3" />
            </div>
        </div>
    )
}

ReactDOM.render(<ReactApp />, document.querySelector('#react-counter'));
