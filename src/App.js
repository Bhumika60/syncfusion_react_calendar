import React, { useState } from 'react';
import './App.css';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
let key = 'ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5bd0ZjXHpfcX1WQGlf';
registerLicense(key);

// Header Component
const Header = ({ category, title }) => (
  <div className="mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

// Schedule Data
const scheduleData = [
  { Id: 1, Subject: 'Monthly Sales Review', Location: 'Head Office', StartTime: '2024-08-01T10:00:00.000Z', EndTime: '2024-08-01T11:30:00.000Z', CategoryColor: '#1aaa55' },
  { Id: 2, Subject: 'Team Stand-up Meeting', Location: 'Conference Room A', StartTime: '2024-08-02T09:00:00.000Z', EndTime: '2024-08-02T09:30:00.000Z', CategoryColor: '#357cd2' },
  { Id: 3, Subject: 'Project Kickoff: New App', Location: 'Zoom Meeting', StartTime: '2024-08-03T14:00:00.000Z', EndTime: '2024-08-03T15:00:00.000Z', CategoryColor: '#7fa900' },
  { Id: 4, Subject: 'Quarterly Financial Report', Location: 'Head Office', StartTime: '2024-08-05T11:00:00.000Z', EndTime: '2024-08-05T12:00:00.000Z', CategoryColor: '#ea7a57' },
  { Id: 5, Subject: 'HR Policy Update', Location: 'HR Department', StartTime: '2024-08-07T13:00:00.000Z', EndTime: '2024-08-07T14:00:00.000Z', CategoryColor: '#00bdae' },
  { Id: 6, Subject: 'Client Onboarding Session', Location: 'Client Office', StartTime: '2024-08-08T15:00:00.000Z', EndTime: '2024-08-08T16:30:00.000Z', CategoryColor: '#f57f17' },
  { Id: 7, Subject: 'Marketing Strategy Meeting', Location: 'Conference Room B', StartTime: '2024-08-09T09:30:00.000Z', EndTime: '2024-08-09T11:00:00.000Z', CategoryColor: '#1aaa55' },
  { Id: 8, Subject: 'Product Demo Day', Location: 'Main Hall', StartTime: '2024-08-10T10:00:00.000Z', EndTime: '2024-08-10T12:00:00.000Z', CategoryColor: '#357cd2' },
  { Id: 9, Subject: 'Annual Budget Planning', Location: 'Head Office', StartTime: '2024-08-12T13:00:00.000Z', EndTime: '2024-08-12T15:00:00.000Z', CategoryColor: '#7fa900' },
  { Id: 10, Subject: 'Tech Team Sync', Location: 'Remote', StartTime: '2024-08-13T16:00:00.000Z', EndTime: '2024-08-13T17:00:00.000Z', CategoryColor: '#ea7a57' },
  { Id: 11, Subject: 'End-of-Month Review', Location: 'Head Office', StartTime: '2024-08-15T10:00:00.000Z', EndTime: '2024-08-15T11:30:00.000Z', CategoryColor: '#00bdae' },
  { Id: 12, Subject: 'Employee Training: New Tools', Location: 'Training Room', StartTime: '2024-08-16T09:00:00.000Z', EndTime: '2024-08-16T10:30:00.000Z', CategoryColor: '#f57f17' },
  { Id: 13, Subject: 'Client Feedback Session', Location: 'Zoom Meeting', StartTime: '2024-08-17T14:00:00.000Z', EndTime: '2024-08-17T15:00:00.000Z', CategoryColor: '#1aaa55' },
  { Id: 14, Subject: 'Project Retrospective', Location: 'Conference Room A', StartTime: '2024-08-19T11:00:00.000Z', EndTime: '2024-08-19T12:30:00.000Z', CategoryColor: '#357cd2' },
  { Id: 15, Subject: 'Customer Support Meeting', Location: 'Customer Service Department', StartTime: '2024-08-20T10:00:00.000Z', EndTime: '2024-08-20T11:00:00.000Z', CategoryColor: '#7fa900' },
  { Id: 16, Subject: 'IT Infrastructure Review', Location: 'IT Department', StartTime: '2024-08-21T13:00:00.000Z', EndTime: '2024-08-21T14:00:00.000Z', CategoryColor: '#ea7a57' },
  { Id: 17, Subject: 'Sales Strategy Update', Location: 'Sales Department', StartTime: '2024-08-22T15:00:00.000Z', EndTime: '2024-08-22T16:30:00.000Z', CategoryColor: '#00bdae' },
  { Id: 18, Subject: 'Product Launch Prep', Location: 'Main Hall', StartTime: '2024-08-23T10:00:00.000Z', EndTime: '2024-08-23T12:00:00.000Z', CategoryColor: '#f57f17' },
  { Id: 19, Subject: 'Weekly Team Review', Location: 'Zoom Meeting', StartTime: '2024-08-24T11:00:00.000Z', EndTime: '2024-08-24T12:00:00.000Z', CategoryColor: '#7fa900' },
  { Id: 20, Subject: 'Annual Review Planning', Location: 'Head Office', StartTime: '2024-08-26T14:00:00.000Z', EndTime: '2024-08-26T15:30:00.000Z', CategoryColor: '#ea7a57' },
  { Id: 21, Subject: 'Vendor Management Meeting', Location: 'Conference Room B', StartTime: '2024-08-27T09:00:00.000Z', EndTime: '2024-08-27T10:30:00.000Z', CategoryColor: '#ea7a57' },
  { Id: 22, Subject: 'Departmental Review', Location: 'Head Office', StartTime: '2024-08-28T13:00:00.000Z', EndTime: '2024-08-28T14:30:00.000Z', CategoryColor: '#00bdae' },
  { Id: 23, Subject: 'Innovation Workshop', Location: 'Innovation Lab', StartTime: '2024-08-29T10:00:00.000Z', EndTime: '2024-08-29T11:30:00.000Z', CategoryColor: '#ea7a57' },
  { Id: 24, Subject: 'Final Project Review', Location: 'Main Hall', StartTime: '2024-08-30T11:00:00.000Z', EndTime: '2024-08-30T12:30:00.000Z', CategoryColor: '#7fa900' },
];



// Scheduler Component
const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState(null);

  const change = (args) => {
    if (scheduleObj) {
      scheduleObj.selectedDate = args.value;
      scheduleObj.dataBind();
    }
  };

  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2024, 7, 19)}
        currentView='Month'
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <div className="mt-5">
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date(2024, 7, 19)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scheduler;