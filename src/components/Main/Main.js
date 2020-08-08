import React, { Component } from 'react'
import './Main.css'

import RespSuggest from '../RespSuggest/RespSuggest'
import MessageBubble from '../RespSuggest/MessageBubble/MessageBubble'
import Chat from '../Chat/Chat'



class Main extends Component {

  state = {
    arr: ['I need help', 'I want to report'],
    prevArr: [''],
    chatMsgs: ['We suggest this route of escape.', '- Remeber to go in the direction opposite to the sound of the gun'],
    showInput: false,
  }

  updateResponses = (arr, log) => {
    const prevArr = this.state.arr;
    const msgs = [...this.state.chatMsgs, log]
    this.setState({
      arr: arr,
      prevArr: prevArr,
      // chatMsgs: msgs
    })

   
  }

  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://js.arcgis.com/4.6/";
    script.async = true;

    document.body.appendChild(script);
}

  render() {
    const clickHandler = (msg) => {
      switch (msg) {
        case 'I need help':
          this.updateResponses(['＜', 'I am injured', 'I am a hostage', ], 'I need help');
          break
        case 'I am injured':
          this.updateResponses(['＜', 'I was shot', 'I have minor damages'], 'I am injured')
          break
        case 'I was shot':
          this.updateResponses(['＜'], 'Hang tight. The dispatcher will contact you shortly.')
          this.setState({ chatMsgs: ['Hang tight. The dispatcher will contact you shortly.', '- Meanwhile, do not attempt to remove bullet', '- Apply direct pressure against the wound to reduce bleeding'] })
          break;
        case '⬅︎':
          this.setState({ arr: this.state.prevArr })
          break
        case 'I want to report':
          this.updateResponses(['＜', 'Confirm', 'Edit'], 'I am injured')
          this.setState({ chatMsgs: ['Please confirm your information.', 'Name: Jake Possert', 'Location: 3901 S Las Vegas Blvd'] })
          break
        case 'Confirm':
          this.updateResponses(['＜', 'Send'], 'I am injured')
          this.setState({ chatMsgs: ['Please describe what you observe.'], showInput: true })
          break
        case 'Send':
          this.updateResponses([], 'I am injured')
          this.setState({ chatMsgs: ['Thank you for your input.'], showInput: false })
          break
        case '＜':
        this.updateResponses(['I need help', 'I want to report'], 'I am injured')
      }
    }

    var request = require('request');

    var options = {
        url: 'https://gateway.watsonplatform.net/discovery/api/v1/environments/929b5158-90ab-4c50-8937-31e51eb083dc/collections/4308aa7a-a795-44a9-aac1-549c24ba89e2/query?version=2017-11-07&aggregation=term%28enriched_text.concepts.text%2Ccount%3A10%29&deduplicate=false&highlight=true&passages=true&passages.count=5&query=',
        auth: {
            'user': '478a2044-8a76-464b-ade4-0e2e67bf4baf',
            'pass': 'WHuMrL7uCyYF'
        }
    };

    const callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    const result = request(options, callback); // We have not trained the recognition of keywords yet, so now it is not giving accurate classification

    return (
      <div className='Main'>
        <h3>Shooting near Mandalay Bay</h3>
        <p id='active' style={{color:'red', fontWeight: 'bold'}}>Active situation - evacuate immediately</p>

        <div className='Map'>
          <iframe id='mappy' src='https://codepen.io/Munchic/pen/WzELXN?editors=1000' />
        </div>
        <Chat messages={this.state.chatMsgs} />

        { this.state.showInput ? <div><input id='inp'></input> <p>You can also speak.</p></div> : null }
        
        <div className="RespSuggest">
          {this.state.arr.map(msg => 
            <MessageBubble msg={msg} clicked={() => clickHandler(msg)} />
          )}
        </div>
      </div>
    );
  } 
}

export default Main
