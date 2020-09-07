import React, {Component} from 'react';
import DashBoard from './DashboardComponent';
import {Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import MealView from './MealTable';
import StudentMessBill from './StudentMessBill';
import ArchitectureView from './ArchitectureView';
import StudentProfile from './StudentProfile';
import StudentLeftNav from './Studentleftnav';
import NoticeView from './NoticeView';
import SubmitComplaint from './SubmitComplaint';
import StudentView from './StudentsComponent';
import EmployeeView from './EmployeeView';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
          EmployeeSal: [],
          Students: [],
          Employees: [],
          Notices: [],
          Architecture: [],
          Seats: [],
          Meals: [],
          MessBills: [] 
        }
    }

    componentDidMount() {
      //this.props.fetchEmployees();
      let students = [];
      this.props.students.students.forEach(element => {
        students.push({
          sid: element.sid,
          name: element.studentName,
          mobile: element.mobileNo,
          program: element.branch,
          gMob: element.fatherMobile,
          guardian: element.fatherName,
          pAddress: element.address,
         
        })
      });
      const studentlist = this.state.Students.concat(students);
      let employees = [];
      this.props.employees.employees.forEach(element => {
        employees.push({
          name: element.employeeName,
          gender: element.gender,
          employeetype: element.employeeType,
          designation: element.designation,
          mobile: element.mobileNo,
          date: element.joiningDate,
          address:element.hostel.name
        })
      });
      const employeeList = this.state.Students.concat(employees);
      let notices = [];
      this.props.notices.notices.forEach(element => {
        notices.push({
          title: element.title,
          description: element.description,
          
        })
      });
      const noticeList = this.state.Notices.concat(notices);
      let salaries = [];
      this.props.salaries.salaries.forEach(element => {
        salaries.push({
          name: element.name,
          month: element.month,
          amount: element.salary,
          })
      });
      const salariesList = this.state.EmployeeSal.concat(salaries);
      // let architecture = [];
      // this.props.architecture.architecture.forEach(element => {
      //   architecture.push({
      //     name: element.hostel.name,
      //     rooms: element.rooms,
      //     blocks: element.blocks,
      //     floors: element.floors,
      //     })
      // });
      // const architectureList = this.state.Architecture.concat(architecture);
      //console.log(this.props.architecture.architecture);
      let seatAllocation = [];
      this.props.seatAllocation.seatAllocation.forEach(element => {
        seatAllocation.push({
          name: element.name,
          block: element.block,
          room: element.room,
          rent: element.monthlyRent,
          })
      });
      const seatAllocationList = this.state.Seats.concat(seatAllocation);

      let mealBills = [];
      this.props.mealBills.bills.forEach(element => {
        mealBills.push({
          name: element.name,
          sid: element.sid,
          branch: element.branch,
          amount: element.payment,
          date: element.paymentDate,
          })
      });
      const mealBillsList = this.state.MessBills.concat(mealBills);
      const mealsList = this.state.Meals.concat(this.props.meals.meals);
  
      this.setState({
        Students: studentlist,
        Employees: employeeList,
        Notices: noticeList,
        EmployeeSal: salariesList,
        //Architecture: architectureList,
        Seats: seatAllocationList,
        MealsBills: mealBillsList,
        Meals: mealsList
      });
      }

    render() {
        return(
            <div className="feature admin">
                <div className="row">
                    <div className="col-md-3">
                        <StudentLeftNav/>
                    </div>
                    <div className="col-md-9">

                        <Switch>
                            <Route path="/student/dashboard"  component={() => <DashBoard architectures={this.props.architecture.architecture}
                                                                                        employees={this.props.employees}
                                                                                        students={this.props.students}
                                                                                        auth={this.props.auth}
                                                                                        notices={this.props.notices.notices}/>}/>
                            <Route exact path="/student/profile" component={StudentProfile}/>
                            <Route exact path="/student/Meal" component={() => <MealView meals={this.state.Meals} isLoading={this.props.meals.isLoading} errMess={this.props.meals.errMess}/>}/>
                            
                            <Route exact path="/student/payment" component={()=><StudentMessBill messBills={this.state.MessBills} isLoading={this.props.mealBills.isLoading} errMess={this.props.mealBills.errMess}/>}/>
                            <Route exact path="/student/Noticeboard" component={() => <NoticeView notices={this.state.Notices} isLoading={this.props.notices.isLoading} errMess={this.props.notices.errMess}/>}/>
                            <Route exact path="/student/Architecture" component={() => <ArchitectureView architectures={this.props.architecture.architecture} isLoading={this.props.architecture.isLoading} errMess={this.props.architecture.errMess}/>}/>
                            <Route exact path="/student/Complaints" component={SubmitComplaint} />
                            <Route exact path="/student/mealview" component={() => <MealView meals={this.state.Meals} isLoading={this.props.meals.isLoading} errMess={this.props.meals.errMess}/>} />
                            <Route exact path="/student/studentView"  component={()=><StudentView students={this.state.Students} isLoading={this.props.students.isLoading} errMess={this.props.students.errMess}/>} />
                            <Route exact path="/student/rooms" component={() => <ArchitectureView architectures={this.state.Architecture} isLoading={this.props.architecture.isLoading} errMess={this.props.architecture.errMess}/>}/>
                            <Route exact path="/student/employeeView" component={()=><EmployeeView employees={this.state.Employees} isLoading={this.props.employees.isLoading} errMess={this.props.employees.errMess}/>}/>
                            <Redirect to="/student/dashboard"/>
                        </Switch>

                    </div>
                </div>
            </div>
        )
    }
}
export default Student;
