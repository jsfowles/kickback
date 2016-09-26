'use strict';
import { serverUrl, apiVersion } from '../env';

export default class Request {
  constructor(props) {
    this.props = props;
    this.url = `${serverUrl}/api/${apiVersion}/${props.path}`;

    return this.sendRequest();
  }

  buildRequest() {
    const { method, headers, body } = this.props;

    return {
      method: method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body) || null,
    };
  }

  requestCallback(res) {
    const { requestCallback } = this.props;
    return requestCallback && requestCallback(res);
  }

  sendRequest = () => (
    fetch(this.url, this.buildRequest())
    .then((res) => {
      this.requestCallback(res);
      return res.json();
    })
    .catch(_ => null)
  )
}
