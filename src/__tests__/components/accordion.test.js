import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import faqsData from '../../fixtures/faqs.json'
import { Accordion } from '../../components'

describe('<Accordion />', () => {
  it('render the <Accordion /> with populated data', () => {
    const {container, getByText} = render(
      <Accordion>
        <Accordion.Title>
          Frequently Asked Question
        </Accordion.Title>
        <Accordion.Frame>
          {faqsData.map(item =>
            <Accordion.Item key={item.id}>
              <Accordion.Header>{item.header}</Accordion.Header>
              <Accordion.Body>{item.body}</Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion.Frame>
      </Accordion>
    )

    expect(getByText('Frequently Asked Question')).toBeTruthy()
    expect(getByText('What is Netflix?')).toBeTruthy()
    expect(getByText('How much does Netflix cost?')).toBeTruthy()
    expect(getByText('Where can I watch?')).toBeTruthy()
    expect(getByText('How do I cancel?')).toBeTruthy()
    expect(getByText('What can I watch on Netflix?')).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('opens and closes the <Accordion /> component', () => {
    const {container, queryByText} = render(
      <Accordion>
        <Accordion.Title>
          Frequently Asked Question
        </Accordion.Title>
        <Accordion.Frame>
          {faqsData.map(item =>
            <Accordion.Item key={item.id}>
              <Accordion.Header>{item.header}</Accordion.Header>
              <Accordion.Body>{item.body}</Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion.Frame>
      </Accordion>
    )

    const whatIsNetflixBodyText = "Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one low fixed monthly fee. Plans start from £5.99 a month. No extra costs or contracts."
      
    expect(queryByText(whatIsNetflixBodyText)).toBeFalsy()
    fireEvent.click(queryByText('How much does Netflix cost?'))
    expect(queryByText(whatIsNetflixBodyText)).toBeTruthy()

    fireEvent.click(queryByText('How much does Netflix cost?'))
    expect(queryByText(whatIsNetflixBodyText)).toBeFalsy()
    expect(container.firstChild).toMatchSnapshot()
  })
})
