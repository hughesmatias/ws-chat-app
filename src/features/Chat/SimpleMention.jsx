import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import mentions from './mentions';

import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import editorStyles from './editorStyles.css';


export default class SimpleMentionEditor extends Component {

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin();
    this.emojiPlugin = createEmojiPlugin();
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.props.handleMessage(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    // get the mention object selected
  }

  focus = () => {
    this.props.toggleUser(true);
    this.editor.focus();
  };

  focusout = () => {
    this.props.toggleUser(false);
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;
    const plugins = [this.mentionPlugin, this.emojiPlugin];

    return (
      <div className="columns is-mobile">
        <div className="column is-4 is-offset-4">
          <div
            onFocus={this.focus}
            onBlur={this.focusout}
            className="textarea"
          >
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={plugins}
              ref={(element) => { this.editor = element; }}
            />
            <EmojiSuggestions />
            <MentionSuggestions
              onSearchChange={this.onSearchChange}
              suggestions={this.state.suggestions}
              onAddMention={this.onAddMention}
            />
            <div
              className={editorStyles.options}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            >
              <EmojiSelect className="selectEmojiButton" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}