cube(`Teacher`, {
  sql: `SELECT * FROM public.teacher`,
  
  joins: {
    Department: {
      sql: `${CUBE}.department_id = ${Department}.id`,
      relationship: `belongsTo`
    },
    
    School: {
      sql: `${CUBE}.school_id = ${School}.id`,
      relationship: `belongsTo`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [lastName, id, firstName]
    }
  },
  
  dimensions: {
    lastName: {
      sql: `last_name`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    firstName: {
      sql: `first_name`,
      type: `string`
    }
  }
});
