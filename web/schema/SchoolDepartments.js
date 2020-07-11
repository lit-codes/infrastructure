cube(`SchoolDepartments`, {
  sql: `SELECT * FROM public.school_departments`,
  
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
      drillMembers: [id]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    }
  },

  refreshKey: {
    every: `4 week`
  }
});
