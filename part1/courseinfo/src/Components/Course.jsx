const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ course }) => {
    const parts = course.parts
    return (
        <>
            <Header course={course} />
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
            <Total course={course} />
        </>
    )
}

const Total = ({ course }) => {
    const parts = course.parts
    let total = parts.reduce((a, c) => a + c.exercises, 0)

    return <b>total of {total} exercises </b>
}

const Course = ({ course }) => course.map(course => <Content key={course.id} course={course} />)

export default Course