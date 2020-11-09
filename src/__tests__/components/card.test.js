import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Card, Player } from '../../components'

const category = 'series'
const slideRows = [
  {
    title: 'Documentaries', 
    data: [
      {
        genre: 'documentaries',
        maturity: '10',
        slug: 'citizenfour',
        description: 'Citizenfour is a 2014 documentary film directed by Laura Poitras, concerning Edward Snowden and the NSA spying scandal.',
        id: '0d021a20-e9d1-432d-bf85-cd7a0b33e964',
        title: 'Citizenfour',
        docId: 'KLWS6TZgWlGuvw7CqHsO'
      }
    ]
  },
  {
    title: 'Feel Good', 
    data: [
      {
        genre: 'feel-good',
        maturity: '12',
        slug: 'school-of-rock',
        description: `Dewey Finn, an amateur rock enthusiast, slyly takes up his friend's substitute teacher's job. Bearing no qualifications for it, he instead starts training the students to form a band.`,
        id: 'bcfb1085-4b7d-47ce-b361-1ce050882333',
        title: 'School of Rock',
        docId: '51vECYQne0HEZFXBS3jF'
      }
    ]
  }
]

describe('<Card />', () => {
  it('renders the <Card /> with populated data', () => {
    const {container, getByText} = render(
      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
    )

    expect(getByText('Documentaries')).toBeTruthy()
    expect(getByText('Citizenfour')).toBeTruthy()
    expect(getByText('Citizenfour is a 2014 documentary film directed by Laura Poitras, concerning Edward Snowden and the NSA spying scandal.')).toBeTruthy()

    expect(getByText('Feel Good')).toBeTruthy()
    expect(getByText('School of Rock')).toBeTruthy()
    expect(getByText(`Dewey Finn, an amateur rock enthusiast, slyly takes up his friend's substitute teacher's job. Bearing no qualifications for it, he instead starts training the students to form a band.`)).toBeTruthy()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders the <Card /> and toggles the card feature', () => {
    const {container, queryByText, getByTestId, getByAltText} = render(
      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item} data-testid={`${item.slug}-item-feature`}>
                  <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4" />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
    )

    expect(queryByText('PG')).toBeFalsy()
    fireEvent.click(getByTestId('citizenfour-item-feature'))
    expect(queryByText('PG')).toBeTruthy()

    fireEvent.click(getByAltText('Close'))
    expect(queryByText('PG')).toBeFalsy()

    expect(queryByText('12')).toBeFalsy()
    fireEvent.click(getByTestId('school-of-rock-item-feature'))
    expect(queryByText('12')).toBeTruthy()

    fireEvent.click(getByAltText('Close'))
    expect(queryByText('12')).toBeFalsy()

    expect(container.firstChild).toMatchSnapshot()
  })
})
