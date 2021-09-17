import '../styles/globals.scss'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { Provider } from 'react-redux'

import store from '../store'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MyApp = ({Component, pageProps}) => {

  return (
    <Provider store={store}>
      <Header />
        <main>
          <Container>
            <Row>
              <Col xs="12">
                <Component {...pageProps} />
              </Col>
            </Row>
          </Container>
        </main>
      <Footer />
    </Provider>
  )
}

export default MyApp
