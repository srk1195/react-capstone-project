import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    // console.log(this.props.actions.multipleActions);
    // Object { createCourse: bindActionCreator(), loadCoursesSuccess: bindActionCreator(), loadCourses: bindActionCreator() }

    if (courses.length === 0) {
      //returning function of loadCourses() will be invoked by thunk middleware?Yes & dispatch will be injected to that fun.
      actions.loadCourses().catch((error) => {
        alert("Loading courses Failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading Authors Failed" + error);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    try {
      toast.success("Course Deleted"); //Optimistic Approach
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed! " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2> Courses </h2>
        {/* this.props.authors.length === 0 || this.props.courses.length === 0 */}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  //multipleActions: PropTypes.isRequired,
};

function mapStateToProps(state) {
  // console.log(state); //Object { courses: [] }
  // state object's each property will have each reducer which we set in rootReducer.
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse : (course) => dispatch(courseActions.createCourse(course))
    // bindActionCreators will wrap entire courseActions or single function on the dispatch.
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      multipleActions: bindActionCreators(courseActions, dispatch),
    },
  };
}

/* connect() wraps the dispatch internally
const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
}; */

// when mapDispatchToProps() is not defined or passed,
// connect will internally makes the dispatch() available to component on props object.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// the above line can be broken into like below.
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps)
// export default connectStateAndProps(CoursesPage)
