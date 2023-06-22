// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer } from '@rails/actioncable';
import { REACT_APP_API_URL } from 'env';

export default createConsumer(`${REACT_APP_API_URL}cable`);
