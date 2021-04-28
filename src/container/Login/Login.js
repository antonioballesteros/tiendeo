import { useContext, useEffect } from 'react'

import { MyContext } from '../../context/Provider'
import auth from '../../context/actions/auth'

import { ErrorCard } from '../../components'

const Login = () => {
  const {
    authDispatch: dispatch,
    authState: {
      auth: { loading, error, token },
    },
  } = useContext(MyContext)

  useEffect(() => {
    if (!loading && !error && !token) {
      auth({ dispatch })
    }
  })

  return (
    <div className="login">
      {loading && <h2>Login ...</h2>}
      {error && <ErrorCard msg={error} />}
    </div>
  )
}

export default Login
