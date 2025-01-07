const Header = (props) => (
    <h2>{props.course}</h2>
)

const Content = ({ parts }) => {
    return (
        <>
        {parts.map((part) => <Part key={part.id} part={part} />)}
        <Total parts={parts} />
        </>
    )
}

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Total = ({ parts }) => (
    <p><b>Number of exercises {parts.reduce((sum, part) => sum += part.exercises, 0)}</b></p>
)

const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </>
    )
}

export default Course