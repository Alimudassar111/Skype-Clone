import React, { Component  } from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import InsertEmoticon from 'material-ui-icons/InsertEmoticon';
import purple from 'material-ui/colors/purple';
import EmojiPicker from 'emoji-picker-react';
import {emojify} from 'react-emojione';
import JSEMOJI from 'emoji-js';
// you can import it with a script tag instead


// new instance
let  jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

// some more settings...
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
}
})

class NewMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
      emojiClicked: false,
      selectedEmoji: '',
      value: ''
    }
    this.emojiHandle = this.emojiHandle.bind(this);
    this.logEmoji = this.logEmoji.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  emojiHandle() {
    this.setState({
      emojiClicked: !this.state.emojiClicked
    });
      }
logEmoji(data,emoji){
  let currentEmoji = jsemoji.replace_unified(`:${emoji.name}:`);
  this.setState({
    selectedEmoji: currentEmoji,
  });
}

handleChange(evt) {
    if (this.state.selectedEmoji) {
                this.addSpecialChar(evt);
    }
}
addSpecialChar(evt) {
 if (evt.target.selectionStart || evt.target.selectionStart === '0') {
        let startPos = evt.target.selectionStart;
         let  endPos = evt.target.selectionEnd;
        evt.target.value = evt.target.value.substring(0, startPos)
        +  emojify(this.state.selectedEmoji, {output: 'unicode'})
        + evt.target.value.substring(endPos, evt.target.value.length);

    } else {
       evt.target.value += emojify(this.state.selectedEmoji, {output: 'unicode'});
    };
    this.setState({
          selectedEmoji: ''
        });
  }
  render() {
    let settings = {
  imageType: 'png',
  sprites: true
};
    const { classes, handleSubmit } = this.props;
    return (
    <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="custom-color-input"
            >
              Type your message here..
            </InputLabel>
            <Input
              onKeyUp={(e) => handleSubmit(e)}
              onMouseEnter={(e) => this.handleChange(e)}
              ref="myField"
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="custom-color-input"
              endAdornment={
             <InputAdornment position="end">
                 <IconButton>
                 <InsertEmoticon onClick={this.emojiHandle} />
                 {this.state.emojiClicked ? <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}><EmojiPicker onEmojiClick={this.logEmoji} emojione={settings} /></div> : null}
                 </IconButton>
             </InputAdornment>
           }
            />
          </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessage);
