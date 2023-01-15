/** Dependencies */
import styled from 'styled-components'

/** API */
import { selectToken } from './api/auth'
import { fetchClassIndex } from '@/pages/api/static/classes'

/** Components */
import CharacterFinder from '@/components/CharacterFinder'
import ClassLeaderboards from '@/components/ClassLeaderboard'

const PageContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  background: rgba(116,140,171);
`


// COLOR PALLETTE
// https://coolors.co/0d1321-1d2d44-3e5c76-748cab-f0ebd8
// rgba(116,140,171) - blue

const Home = ({ auth, classes }) => {
  return (
    <PageContainer>
      <CharacterFinder auth={auth} />
      <ClassLeaderboards classes={classes} auth={auth} />
    </PageContainer>
  )
}

export const getStaticProps = async (ctx) => {
  const token = await selectToken(ctx)
  const index = await fetchClassIndex({ access_token: token })

  return {
    props: {
      auth: { token },
      classes: index?.classes,
    },
  }
}

export default Home
