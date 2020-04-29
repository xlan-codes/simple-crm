import { Job } from './job.model';
import { Employee } from './employee.model';

export class Schedule {

    public Id: string;
    
    public StartHour: Date;
    
    public EndHour: Date;
    
    public Created: Date;
    
    public Modified: Date;
    
    public Employee: Employee;
    
    public Job: Job;
    
    public TaskDescription: string;
    
    public Date: Date;
    
}
