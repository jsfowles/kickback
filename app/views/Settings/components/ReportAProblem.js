'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TextInput } from 'react-native';

import Container from '../../shared/Container';
import { submitProblem, updateProblemBody } from '../../../actions';

const ReportAProblem = ({
  handleNavigate,
  subject,
  submitProblem,
  updateProblemBody,
  disabled,
  body,
}) => (
  <Container
    headerColors={[ '#45baef', '#34bcd5' ]}
    title={ subject }
    leftItem={{
      title: 'Cancel',
      onPress: _ => handleNavigate({ type: 'pop' }),
    }}
    rightItem={{
      title: 'Send',
      disabled: disabled,
      onPress: _ => {
        submitProblem(subject)
        .then(handleNavigate({ type: 'pop' }));
      },
    }}
  >
    <View style={ styles.container }>
      <View style={ styles.reasonContainer }>
        <Text style={ styles.reasonText }>{ subject }</Text>
      </View>

      <TextInput
        style={ styles.reasonTextInput }
        multiline={ true }
        placeholder='Briefly explain what happened.'
        value={ body }
        onChange={ updateProblemBody }
      />
    </View>
  </Container>
);

ReportAProblem.propTypes = {
  handleNavigate: React.PropTypes.func,
  route: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  }),
  updateProblemBody: React.PropTypes.func.isRequired,
  submitProblem: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  body: React.PropTypes.string,
  subject: React.PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },

  reasonContainer: {
    borderBottomWidth: 1,
    borderColor: '#adb2bb',
    paddingVertical: 20,
    paddingLeft: 13,
  },

  reasonText: {
    fontSize: 14,
    color: '#adb2bb',
  },

  reasonTextInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
    fontSize: 14,
  },
});

const mapStateToProps = state => ({
  disabled: !state.settings.canSubmitProblem,
  body: state.settings.problemBody,
});

const mapActionsToProps = dispatch => ({
  updateProblemBody: e => dispatch(updateProblemBody(e.nativeEvent.text, true)),
  submitProblem: title => dispatch(submitProblem(title)),
});

export default connect(mapStateToProps, mapActionsToProps)(ReportAProblem);
