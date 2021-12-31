
interface Props {
  children: React.ReactNode
}

const style = {
  container: {
    margin: '2px',
    
  },
}

export default function({children} : Props) {

  return (
    <div className="container" style={style.container}>
      {children}
    </div>
  )
}

