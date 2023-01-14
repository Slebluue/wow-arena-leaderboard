/** Dependencies */
import styled from 'styled-components'

/** API */
import { selectToken } from './api/auth'

/** Components */
import CharacterFinder from '@/components/CharacterFinder'


const PageContainer = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`


const Home = ({ auth }) => {
  return (
    <PageContainer>
      <CharacterFinder
        auth={auth}
        name='Bluuemy'
        bracket='shuffle-monk-mistweaver'
      />
      <CharacterFinder
        auth={auth}
        name='Bluuee'
        bracket='shuffle-evoker-preservation'
      />
      <CharacterFinder
        auth={auth}
        name='Dankboipucci'
        bracket='shuffle-warrior-arms'
      />
      <CharacterFinder
        auth={auth}
        name='Blessdatbutt'
        bracket='shuffle-paladin-retribution'
      />
      <CharacterFinder
        auth={auth}
        name='Blessdatbutt'
        bracket='shuffle-paladin-holy'
      />
    </PageContainer>
  )
}

export const getServerSideProps = async (ctx) => {
  const token = await selectToken(ctx)

  return {
    props: { auth: { token } }
  }
}

export default Home
