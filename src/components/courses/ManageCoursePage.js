import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props // grabs rest of the props (ie., not destructred) into a object.
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      // returning function of loadCourses() will be invoked by thunk middleware?
      // Yes & dispatch will be injected to that fun.
      loadCourses().catch((error) => {
        alert("Loading courses Failed" + error);
      });
    } else {
      //to popluate when load the course page as directly url
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading Authors Failed" + error);
      });
    }

    return () => {};
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target; // destructring above avoids synthetic errors in async comps.
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsvalid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    //Form is valid if the errors obj still has no properties.
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsvalid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("course Saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <>
      {/* hide form until our API fetches data. */}

      {authors.length === 0 || courses.length === 0 ? (
        <Spinner />
      ) : (
        <CourseForm
          course={course}
          errors={errors}
          authors={authors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

//selector
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  //ownProps gives access to components props.
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

//In this way, dispatch will be autolly injected on each property.
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

// when mapDispatchToProps() is not defined or passed,
// connect will internally makes the dispatch() available to component on props object.
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

// the above line can be broken into like below.
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps)
// export default connectStateAndProps(ManageCoursePage)
