
interface Props {
  children: React.ReactNode
}

const style = {
  container: {
    marginTop: '10%'
  },
}

export default function({children} : Props) {

  return (
    <div className="d-flex justify-content-center" style={style.container}>
      {children}
    </div>
  )
}

