cube(`Teacher`, {
  sql: `SELECT * FROM public.teacher`,
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [firstName, lastName, id]
    }
  },
  
  dimensions: {
    firstName: {
      sql: `first_name`,
      type: `string`
    },
    
    lastName: {
      sql: `last_name`,
      type: `string`
    },
    
    teacherId: {
      sql: `id`,
      type: `number`,
    },

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
