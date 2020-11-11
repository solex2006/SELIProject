import React from 'react';
import WeeklyCard from './Card/WeeklyCard';
import StudyCard from './Card/StudyCard';
import HealthCard from './Card/HealthCard';
import StudyNotification from './StudyNotification';
import HealthNotification from './HealthNotification';
import { FaBriefcaseMedical, FaPaperPlane } from 'react-icons/fa';
import User from './User';

export default function Deshboard() {
    return (
      <div className="wrapper">
            <div className="content">
                <div className="row">
                  <div className="col-12">
                  <User/>
                  </div>
                </div> 
                         {/* <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                    <div className="card-header ">
                        <div className="row">
                        <div className="col-sm-6 text-left">
                            <h3 className="card-title">Performance</h3>
                        </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <WeeklyCard/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                 */}
                <div className="row">
                <div className="col-lg-6">
                    <div className="card card-chart">
                      <div className="card-header">
                        <h5 className="card-category">Study plan vs Goal</h5>
                      </div>
                      <div className="card-body">
                          <div className="chart-area">
                          <StudyCard/>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card card-chart">
                    <div className="card-header" >
                        <h5 className="card-category">Health and Goal</h5>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                          <HealthCard/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
            <div className="col-lg-6">
                <div className="card card-chart">
                  <div className="card-header">
                    <h5 className="title d-inline">Study</h5>
                    <p className="card-category d-inline"> (Reflactions)</p>
                  </div>
                  <div className="card-body">
                      <div className="chart-area">
                        <StudyNotification/>
                      </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card card-chart">
                <div className="card-header">
                    <h5 className="title d-inline">Health</h5>
                    <p className="card-category d-inline"> (Reflactions)</p>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                      <HealthNotification/>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <footer className="footer">
                <div className="container-fluid">
                  <div className="copyright" style={{float: "right"}}>
                    ©
                    An initiative of Dr Solomon Oyelere. Designed by
                    <a href="" target="_blank"> Md Jahedur Rahman</a>
                  </div>
                </div>
            </footer>
        </div>
    )
}

