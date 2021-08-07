const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useEffect } = React;


function App() {
    let [volume, setVolume] = useState(50)
    let [bank, setBank] = useState(true)
    let [power, setPower] = useState(true)
    let [currentStroke, setCurrentStroke] = useState(null)
    let [display, setDisplay] = useState(null)

    handleClicked = (event) => {
        if (power) {
            let stroke = event.target.firstChild.id.charCodeAt(0)
            setCurrentStroke(stroke)
            let d = bank
                ? bankOne.filter(obj => obj.keyCode === stroke)[0].id
                : bankTwo.filter(obj => obj.keyCode === stroke)[0].id
            setDisplay(d)
        }
    }
    useEffect(() => {
        if (currentStroke) {
            playSound();
            applyActivatedStyle();
        }
    })

    playSound = () => {
        if (power) {
            const audio = document.getElementById(String.fromCharCode(currentStroke))
            audio.volume = volume / 100
            audio.currentTime = 0;
            audio.play();
        }
    }

    handleSwitched = (event) => {
        if (event.target.id === "Power-switch") {
            setPower(!power)
            setDisplay(null)
            setCurrentStroke(null)
        }
        else if (event.target.id === "Bank-switch") {
            setBank(!bank)
            setCurrentStroke(null)
            let d = !power
                ? null
                : bank
                    ? bankKit[0]
                    : bankKit[1]
            setDisplay(d)
        }
    }

    handleVolumeChanged = (event) => {
        let vol = !power ? null : event.target.value;
        setVolume(vol)
        setDisplay(`Volume: ${vol}`)
    }

    applyActivatedStyle = () => {
        if (power) {
            let padID = bank
                ? bankOne.filter(obj => obj.keyCode === currentStroke)[0].id
                : bankTwo.filter(obj => obj.keyCode === currentStroke)[0].id;

            document.getElementById(padID).classList.add('activated')
            setTimeout(() => {
                document.getElementById(padID).classList.remove('activated')
            }, 200)
        }
    }

    useEffect(() => {
        handleKeyDown = (event) => {
            if (keyCodeAvailable.includes(event.keyCode)) {
                setCurrentStroke(event.keyCode)
                if (power) {
                    let d = bank
                        ? bankOne.filter(obj => obj.keyCode === event.keyCode)[0].id
                        : bankTwo.filter(obj => obj.keyCode === event.keyCode)[0].id
                    setDisplay(d);
                    playSound();
                    applyActivatedStyle();
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    })



    return (
        <div id="drum-machine">
            <Keyboard handleClicked={handleClicked} currentStroke={currentStroke} bank={bank} />
            <Switch name="Power" handleSwitched={handleSwitched} switch={power} />
            <Display display={display} currentStroke={currentStroke} bank={bank} power={power} />
            <Slider name="volume" volume={volume} handleVolumeChanged={handleVolumeChanged} />
            <Switch name="Bank" handleSwitched={handleSwitched} switch={bank} />
        </div>
    )
}

function Keyboard(props) {
    return (
        <div id="keyboard">
            <Key name="Q" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="W" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="E" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="A" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="S" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="D" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="Z" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="X" handleClicked={props.handleClicked} bank={props.bank} />
            <Key name="C" handleClicked={props.handleClicked} bank={props.bank} />
        </div>
    )
}

function Key(props) {
    let audioSrc = props.bank
        ? bankOne.filter(obj => obj.keyTrigger === props.name)[0].url
        : bankTwo.filter(obj => obj.keyTrigger === props.name)[0].url;

    let padID = props.bank
        ? bankOne.filter(obj => obj.keyTrigger === props.name)[0].id
        : bankTwo.filter(obj => obj.keyTrigger === props.name)[0].id;

    return (
        <div id={padID} className="drum-pad" onClick={props.handleClicked}>
            <audio id={props.name} className="clip" src={audioSrc} />
            {props.name}
        </div>
    )
}

function Display(props) {
    return (
        <div id="display">
            <p>{props.display}</p>
        </div>
    )
}

function Switch(props) {
    let classes = props.switch
        ? `switch switched`
        : 'switch'
    return (
        <div id={props.name} >
            <span>{props.name}</span>
            <div id={`${props.name}-switch`} className={classes} onClick={props.handleSwitched}>
                <div className="switch-button"></div>
            </div>
        </div>
    )
}

function Slider(props) {
    return (
        <div id={props.name}>
            <input type="range" step="1" min="0" max="100" onChange={props.handleVolumeChanged} />
        </div>
    )
}



const bankOne = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
];

const bankTwo = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];
const keyCodeAvailable = bankOne.map(obj => obj.keyCode)
const bankKit = ['Heater Kit', 'Smooth Piano Kit']


ReactDOM.render(<App />, document.getElementById("app"))