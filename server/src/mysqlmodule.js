const mysql = require("mysql2");
const { StringManipulate } = require("./utilities");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "servicehub",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000 // 10 seconds
  })
  .promise();

//user queries
async function get_userId(email, password) {
  try {
    const [row] = await pool.query(
      `SELECT id FROM user WHERE email = ? AND password = ? `,
      [email, password]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//admin queries
async function get_adminId(email, password, role) {
  //role parameter -> possible value [Admin, Manager]

  //switch statement where
  let adminRole;

  switch (role) {
    case "Admin":
      adminRole = "regular";
      break;

    case "Manager":
      adminRole = "manager";
      break;

    default:
      throw new Error("Invalid Module Entered  from admin login form");
  }

  try {
    const [row] = await pool.query(
      `SELECT id FROM admin WHERE email = ? AND password = ? AND role = ?`,
      [email, password, adminRole]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function GetAllClientInformation() {
  try {
    //return the total registered user
    const ClientDataInformationRow = await pool.execute(`
      SELECT COUNT(*) 
      FROM user
    `);

    return ClientDataInformationRow;
  } catch (error) {
    console.log(error);
  }
}

//another function to count number of female and male
//another function to count the registred memeber lived in manila, qc, pasay
//another function to count the regitered member manila district 1, 2

async function post_EventJob(
  Type,
  Creator_id,
  EventTitle,
  ScheduledDate,
  ScheduledTime,
  Location,
  Description,
  Disability,
  TicketLimit,
  filesArray
) {
  Disability = JSON.stringify(Disability);
  filesArray = JSON.stringify(filesArray);

  const Table = Type === "event" ? "event_post" : "job_post";

  // const DateNow = MyDateTime.Datenow();

  try {
    await pool.execute(
      `
        INSERT INTO ${Table}
        (creator,
        date_created,
        time_created,
        scheduled_date,
        scheduled_time,
        location,
        event_title,
        description,
        target_group,
        post_type,
        imagefiles,
        archive_status,
        ticket_limit
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Creator_id,
        MyDateTime.Datenow(),
        MyDateTime.Timenow(),
        ScheduledDate,
        ScheduledTime,
        Location,
        EventTitle,
        Description,
        Disability,
        Table,
        filesArray,
        "false",
        TicketLimit
      ]
    );
  } catch (error) {
    console.log("Error in 'post_Event' function in mysqlmodule.js");
    throw error;
  }
}

// async function post_Job(Creator_id, EventTitle, ScheduledDate, ScheduledTime, Location, Description, Disability, filesArray){

//     Disability = JSON.stringify(Disability);
//     filesArray = JSON.stringify(filesArray);

//     try{

//         await pool.execute(`

//         `)

//     }catch(error){

//         console.log('Error in \'post_Job\' function in mysqlmodule.js');
//         throw error;

//     }
// }

async function job_post_edit(
  para_postID,
  para_Event,
  para_Date,
  para_Time,
  para_Location,
  para_Description,
  para_Taget_group,
  para_PostType
) {
  //query for editing the post in the MySQL Server
  console.log({para_postID,
    para_Event,
    para_Date,
    para_Time,
    para_Location,
    para_Description,
    para_Taget_group,
    para_PostType});

  try {
    await pool.execute(
      `
        UPDATE ${para_PostType}
        SET scheduled_date = ?,
            scheduled_time = ?,
            event_title = ?,
            description = ?,
            location = ?,
            target_group = ?
        WHERE id = ?`,
      [para_Date, para_Time, para_Event, para_Description, para_Location, para_Taget_group, para_postID]
    );
  } catch (error) {
    console.log("Error in the post_edit function @ mysqlmodule.js");
    throw error;
  }
}

async function fetchEvent() {
  try {
    const [row] = await pool.execute(`
      SELECT * 
      FROM event_post 
      ORDER BY id DESC
      `);

    let newRow = row.map((record) => {
      record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
      record.target_group = StringManipulate.RemoveQuotation(
        record.target_group
      );

      return record;
    });

    return newRow;
  } catch (error) {
    console.log("Error in 'fetchEventPosting() function' in mysqlmodule.js");
    throw error;
  }
}

async function fetchJob() {
  try {
    const [row] = await pool.execute(
      `SELECT job_post.* , admin.firstName, admin.lastName 
      FROM job_post 
      INNER JOIN admin ON job_post.creator = admin.id COLLATE utf8mb4_general_ci 
      ORDER BY job_post.id DESC
      `
    );

    //cleaning the uncertain format of column value

    let newRow = row.map(function (record) {
      record.imagefiles = StringManipulate.RemoveQuotation(record.imagefiles);
      record.target_group = StringManipulate.RemoveQuotation(
        record.target_group
      );

      return record;
    });

    return newRow;
  } catch (error) {
    console.log("Error in 'fetchJob() function' in mysqlmodule.js");
    throw error;
  }
}

async function deletePost(id, post_type) {
  let table;

  post_type === "event_post" ? (table = "event_post") : (table = "job_post");

  try {
    await pool.execute(`DELETE FROM ${table} WHERE id = ${id}`);
  } catch (error) {}
}

async function FetchAdminInboxFromClient(adminId) {
  try {
    // const [row] = await pool.execute(
    //   `
    //     SELECT mail_sent.*, user.firstName
    //     FROM mail_sent
    //     JOIN user ON mail_sent.senderID = user.id COLLATE utf8mb4_general_ci
    //     WHERE mail_sent.receiverID = ?
    //     `,
    //   [adminId]
    // );
    // return row;

    const [row] = await pool.execute(
      `
      SELECT senderID
      FROM mail_sent
      WHERE receiverID = ? 
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s")
      DESC LIMIT 1000;
      `,
      [adminId]
    );

    return row;
  } catch (error) {
    throw error;
  }
}

async function FetchAdminIboxes(adminId) {
  //retrun an array of senderIDs associated with given adminId parameter as the receiverID

  try {
    const [AdminInboxes] = await pool.execute(
      `
      SELECT senderID 
      FROM mail_sent 
      WHERE receiverID = ? 
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC LIMIT 1000;
      `,
      [adminId]
    );
  } catch (error) {
    throw error;
  }
}

async function getAdmin() {
  try {
    const [AdminIdRow] = await pool.execute(
      `SELECT id FROM admin WHERE role="regular"`
    );

    if (AdminIdRow.length == 0) {
      return null;
    } else {
      return AdminIdRow;
    }
  } catch (error) {
    throw error;
  }
}

async function AdminMailInsert(MailObj) {
  try {
    await pool.execute(
      `
        INSERT INTO mail_sent
        (send_id,
        senderID,
        date_sent,
        time_sent,
        receiverID,
        subject,
        body,
        documentfile,
        imagefile,
        read_status)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        0,
        MailObj.SenderId,
        MyDateTime.Datenow(),
        MyDateTime.Timenow(),
        MailObj.AssignedClient,
        MailObj.MailSubject,
        MailObj.MailBody,
        MailObj.MailDocFile,
        MailObj.MailImageFile,
        "unread",
      ]
    );
  } catch (error) {
    throw error;
  }
}

async function GetSentMail(id) {
  try {
    // const [SentMailArray] = await pool.execute(`SELECT * FROM mail_sent WHERE senderID = "${id}" ORDER BY STR_TO_DATE(CONCAT(date_sent, ' ', time_sent), '%Y-%m-%d %H:%i:%s') DESC`);

    const [SentMailArray] = await pool.execute(`
        SELECT 
        mail_sent.send_id,
        mail_sent.senderID,
        mail_sent.date_sent,
        mail_sent.time_sent,
        mail_sent.receiverID,
        mail_sent.subject,
        mail_sent.body,
        mail_sent.documentfile,
        mail_sent.imagefile,
        mail_sent.read_status, 
        user.id AS user_id,
        user.firstName,
        user.middleName,
        user.lastName
        FROM mail_sent JOIN user ON mail_sent.receiverID = user.id
        COLLATE utf8mb4_unicode_ci WHERE mail_sent.senderID = "${id}"
        COLLATE utf8mb4_unicode_ci ORDER BY STR_TO_DATE(CONCAT(mail_sent.date_sent, ' ', mail_sent.time_sent), '%Y-%m-%d %H:%i:%s') DESC;
      `);
    return SentMailArray;
  } catch (error) {
    throw error;
  }
}


async function getRegistry(userId){

  try{
    //get the even_registry and job_registry, "where @ userId" 

    const [event_registry_array] = await pool.execute(`
      SELECT * 
      FROM event_registry
      WHERE user_id = ?
      `, [userId]);
    


    const [job_registry_array] = await pool.execute(`
      SELECT *
      FROM job_registry
      WHERE user_id = ?
      `, [userId]);


    const RegistryObj ={
      event_registry: event_registry_array,
      job_registry: job_registry_array
    }


    return RegistryObj;

  }catch(error){
    throw error;
  }
}

async function getRegistryInnerJoinPost(userId){

 

  try{

    const [EventRegistryInnerJoinEvent] = await pool.execute(`
      SELECT event_registry.registration_id, event_registry.event_id, event_registry.user_id, event_registry.registration_code, event_post.*
      FROM event_registry
      INNER JOIN event_post ON event_registry.event_id = event_post.id
      WHERE user_id = ?
      ORDER BY event_registry.registration_id DESC
      `, [userId]
    )

    const [JobRegistryInnerJoinPost] = await pool.execute(`
      SELECT job_registry.registration_id, job_registry.job_id, job_registry.user_id, job_registry.registration_code, job_post.* 
      FROM job_registry
      INNER JOIN job_post ON job_registry.job_id = job_post.id
      WHERE user_id = ?
      ORDER BY job_registry.registration_id DESC
      `, [userId]
    );

    const RegistryInnerJoinedPost = {
      eventInnerJoinPost: EventRegistryInnerJoinEvent,
      jobInnerJoinPost: JobRegistryInnerJoinPost
    }

    return RegistryInnerJoinedPost;


  }catch(error){
    throw error;
  }

}


async function ArchivingPost(table, post_id, statusBoolean){

  try{


    await pool.execute(`
      UPDATE ${table}
      SET archive_status = ?
      WHERE id = ? 
      `, [statusBoolean, post_id]
    );

  }catch(error){
    throw error;
  }
}


async function EventViewStats(event_id){

  try{

    const [EventRegistyEntry] = await pool.execute(`
      SELECT user.firstName, user.middleName, user.lastName, event_registry.user_id, event_registry.event_id, event_registry.registration_code 
      FROM event_registry 
      INNER JOIN user ON CONVERT(event_registry.user_id USING utf8mb4) COLLATE utf8mb4_unicode_ci = CONVERT(user.id USING utf8mb4) COLLATE utf8mb4_unicode_ci 
      WHERE event_registry.event_id = ?
      `, [event_id]);

      console.log(EventRegistyEntry);
      return EventRegistyEntry;

  }catch(error){
    console.log('error  on the msqlmodule.js @ EventViewStats() function.', error);
    throw error;
  }
}

async function JobViewStats(job_id){

  try{

    const [JobRegistryEntry] = await pool.execute(`
      SELECT user.firstName, user.middleName, user.lastName, job_registry.user_id, job_registry.job_id, job_registry.registration_code 
      FROM job_registry 
      INNER JOIN user ON CONVERT(job_registry.user_id USING utf8mb4) COLLATE utf8mb4_unicode_ci = CONVERT(user.id USING utf8mb4) COLLATE utf8mb4_unicode_ci 
      WHERE job_registry.job_id = ?
      `, [job_id]);

      console.log('log from mysqlmoldule.js');
      console.log(JobRegistryEntry);
      
      return JobRegistryEntry;

  }catch(error){
    console.log('error on the mysqlmodule.js @ JobViewStats() function.', error);
    throw error;
  }

}


async function GetEventRow(event_id){

  try{
    const [EventRow] = await pool.execute(`
      SELECT * 
      FROM event_post
      WHERE id = ?
      `, [event_id]);


    // to return the row itself from the array format
    return EventRow[0];

  }catch(error){
    throw error;
  }

}

async function GetEventRegisteredTicket_Count(event_id){

  try{
    const [Count] = await pool.execute(`
      SELECT COUNT(*) AS total_registry
      FROM event_post
      WHERE id = ?
      `, [event_id]);

    return Count[0].total_registry;

  }catch(error){
    throw error; 
  }
}

async function UpdateEventTicketCount(event_id, ticketCount){

  try{

    await pool.execute(`
      UPDATE event_post
      SET registered_tickets = ?
      WHERE id = ?
      `, [ticketCount, event_id]);

  }catch(error){
    throw error;
  }

}

async function GetJobRow(job_id){

  try{
    const [JobRow] = await pool.execute(`
      SELECT * 
      FROM job_post
      WHERE id = ?
      `, [job_id]);


    // to return the row itself from the array format
    return JobRow[0];

  }catch(error){
    throw error;
  }

}

async function GetJobRegisteredTicket_Count(job_id){

  try{
    const [Count] = await pool.execute(`
      SELECT COUNT(*) AS total_registry
      FROM job_post
      WHERE id = ?
      `, [job_id]);

    return Count[0].total_registry;

  }catch(error){
    throw error;
  }
}

async function UpdateJobTicketCount(job_id, ticketCount){

  try{

    await pool.execute(`
      UPDATE job_post
      SET registered_tickets = ?
      WHERE id = ?
      `, [ticketCount, job_id]);

  }catch(error){
    throw error;
  }

}

// async function AdminSentItems(id){

//   try{

//     const [SentItemsArray] = await pool.execute(`

//       `)

//   }catch(error){
//     throw error;
//   }
// }

const MyDateTime = {
  Timenow: () => {
    const TheDateTime = new Date();
    const option = {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    let timeString = TheDateTime.toLocaleTimeString("en-US", option);

    return timeString;
  },

  Datenow: () => {
    const TheDateTime = new Date();

    let year = TheDateTime.getFullYear();
    let month = TheDateTime.getMonth() + 1;
    let day = TheDateTime.getDate();

    return `${year}-${month}-${day}`;
  },
};

// async function show(){
//     console.log(await get_userId('sample1000@gmail.com', '1234'));
// }

// show();























// mysql query for the clientuser

async function clientuserLoginSession(email, password) {
  //return the id of this clientuser login session

  try {
    const [rowdata] = await pool.execute(
      `SELECT id FROM user WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (rowdata.length != 0) {
      return rowdata; //return the result of the query which is the id of this login credentials
    } else {
      return [null];
    }
  } catch (error) {
    throw error;
  }
}

async function ClientData(id) {
  // id = 1000
  //select (user, fist , last , addres) from user where id = id

  try {
    const [rowdata] = await pool.execute(
      `SELECT firstName, middleName, Lastname, age, gender, disability, houseno, street, barangay, district, city, province, zipcode, phone, status FROM user WHERE id = ${id}`
    );

    if (rowdata.length != 0) {
      return rowdata;
    } else {
      return null;
    }

    // query statement
  } catch (error) {
    throw error;
  }
}

async function clientInformation(id) {
  try {
    /*
        information to from the user table

        Username
        Name
        Age
        Gender
        Address
        City
        District
        Contact No.
        Member Status
        */
    const [clientInformationRow] = await pool.execute(
      `
            SELECT (
                firstName,
                lastName,
                age,
                gender,
                barangay,
                street,
                houseno,
                district,
                city,
                phone,
                status
            ) FROM user WHERE id = ${id}
            `
    );

    if (clientInformationRow.length != 0) {
      return clientInformationRow[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function ClientMailInsert(MailObj) {
  try {
    //logic here to insert the MailSend to the mail_sent table on the database

    await pool.execute(
      `
        INSERT INTO mail_sent
        (send_id,
        senderID,
        date_sent,
        time_sent,
        receiverID,
        subject,
        body,
        documentfile,
        imagefile,
        read_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        0,
        MailObj.SenderId,
        MyDateTime.Datenow(),
        MyDateTime.Timenow(),
        MailObj.AssignedAdmin,
        MailObj.MailSubject,
        MailObj.MailBody,
        MailObj.MailDocFile,
        MailObj.MailImageFile,
        "unread",
      ]
    );
  } catch (error) {
    throw error;
  }
}

async function GetClientSentMail(id) {
  try {
    // const [SentMailArray] = await pool.execute(`SELECT * FROM mail_sent WHERE senderID = "${id}" ORDER BY STR_TO_DATE(CONCAT(date_sent, ' ', time_sent), '%Y-%m-%d %H:%i:%s') DESC`);

    const [SentMailArray] = await pool.execute(`
          SELECT 
          mail_sent.send_id,
          mail_sent.senderID,
          mail_sent.date_sent,
          mail_sent.time_sent,
          mail_sent.receiverID,
          mail_sent.subject,
          mail_sent.body,
          mail_sent.documentfile,
          mail_sent.imagefile,
          mail_sent.read_status, 
          admin.id AS admin_id,
          admin.firstName,
          admin.lastName
          FROM mail_sent JOIN admin ON mail_sent.receiverID = admin.id
          COLLATE utf8mb4_unicode_ci WHERE mail_sent.senderID = "${id}"
          COLLATE utf8mb4_unicode_ci ORDER BY STR_TO_DATE(CONCAT(mail_sent.date_sent, ' ', mail_sent.time_sent), '%Y-%m-%d %H:%i:%s') DESC;
        `);
    return SentMailArray;
  } catch (error) {
    throw error;
  }
}

async function FetchInboxOfClient(id) {
  try {
    // const [ClientInbox] = await pool.execute(`
    //   SELECT mail_sent.*, admin.firstName, admin.lastName
    //   FROM mail_sent
    //   JOIN admin ON mail_sent.senderID = admin.id
    //   COLLATE utf8mb4_general_ci WHERE mail_sent.receiverID = ?
    //   ORDER BY STR_TO_DATE(CONCAT(mail_sent.date_sent, ' ', mail_sent.time_sent), '%Y-%m-%d %H:%i:%s') DESC
    // `,[id]);

    // return ClientInbox;

    const [ClientInbox] = await pool.execute(
      `
      SELECT senderID
      FROM mail_sent
      WHERE receiverID = ?
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC 
      LIMIT 1000;
      `,
      [id]
    );

    return ClientInbox;
  }catch(error){
    throw error;
  }

}

async function NewFetchInboxClient(SenderClientId){

  try{

    const [ReceiverAdminIdArray] = await pool.execute(`
      SELECT receiverID
      FROM mail_sent
      WHERE senderID = ?
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC
      LIMIT 1000;
      `, [SenderClientId]);

      return ReceiverAdminIdArray;

  }catch(error){
    console.log(`error at the mysqlmodule.js @ 'NewfetchInboxClient' function.`, error);
    throw error;
  }
}


async function ALL_SendMaiL(ClientReceiver_id, SenderAdminId) {
  try {
    const [SendMails] = await pool.execute(
      `
      SELECT * 
      FROM mail_sent
      WHERE senderID = ? AND receiverID = ?
      ORDER BY STR_TO_DATE(CONCAT(date_sent, " ", time_sent), "%Y-%m-%d %H:%i:%s") DESC;
      `,
      [ClientReceiver_id, SenderAdminId]
    );

    return SendMails;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function dashboardQuery() {
  // id = 1000
  //select (user, fist , last , addres) from user where id = id

  try {
    const [rowdata] = await pool.execute(`SELECT * FROM user`);

    return rowdata;

    // query statement
  } catch (error) {
    throw error;
  }
}

async function filteredDashboardQuery(city){

  try{

    const [rowdata] = await pool.execute(`
      SELECT * 
      FROM user
      WHERE city = ?
      `, [city]);

      return rowdata;

  }catch(error){

    console.log(`error on the mysqlmodule.js @ filterDashboardQuery function `, error);
    throw error;

  }
}

async function getEventRegistry(userId){

  try{

    const [registrtArray] = await pool.execute(`
      SELECT event_id
      FROM event_registry
      WHERE user_id = ?
      `, [userId]);

      return registrtArray;

  }catch(error){
    throw error;
  }
}


async function getJobRegistry(userId){

  try{

    const [RegistryArray] = await pool.execute(`
        SELECT job_id
        FROM job_registry
        WHERE user_id = ?
      `, [userId]);


      return RegistryArray;
    
  }catch(error){
    throw error;
  }
}


async function InsertTikcetCodeEvent(ticket_code){

  //divide the ticket into 3 parts
  // 1. event_id
  //2. ticket code
  //3. user_id

  const registration_code = ticket_code;
  const ticket_code_array = ticket_code.split('-');

  const event_id = ticket_code_array[0];
  const code = ticket_code_array[1];
  const user_id = ticket_code_array[2];


  //query here to insert data to the database at event_registry

  try{

    await pool.execute(`
      INSERT INTO event_registry
      (event_id, user_id, registration_code)
      VALUES (?, ?, ?);
      `,
      [event_id, user_id, registration_code]
    );


  }catch(error){
    throw error;
  }

}

async function InsertTicketCodeJob(ticket_code){

  const registration_code = ticket_code;
  const ticket_code_array = ticket_code.split('-');

  const job_id = ticket_code_array[0];
  const code = ticket_code_array[1];
  const user_id = ticket_code_array[2];


  //query here to insert data to the database at job_registry

  try{
    await pool.execute(`
      INSERT INTO job_registry
      (job_id, user_id, registration_code)
      VALUES (?, ?, ?);
      `,
      [job_id, user_id, registration_code]
    );

  }catch(error){
    throw error;
  }

}

async function TicketCancelationEvent(event_registration_id){

  try{

    await pool.execute(`
      DELETE
      FROM event_registry
      WHERE registration_id = ?;
      `, [event_registration_id]);

  }catch(error){
    throw error;
  }

}

async function TicketCancelationJob(job_registration_id){

  try{

    await pool.execute(`
      DELETE
      FROM job_registry
      WHERE registration_id = ?;
      `, [job_registration_id]);

  }catch(error){
    throw error;
  }

}


module.exports = {
  //user function exports
  get_userId,

  //admin function exports

  MyDateTime, // Object

  get_adminId, //gettig the adminId
  post_EventJob, //inserting the Event or Job data information to the database
  fetchEvent,
  fetchJob,
  job_post_edit,
  deletePost,
  FetchAdminInboxFromClient,
  FetchAdminIboxes,
  getAdmin,
  AdminMailInsert,
  GetSentMail,
  GetAllClientInformation,
  getRegistry,
  getRegistryInnerJoinPost,
  ArchivingPost,
  EventViewStats,
  JobViewStats,
  GetEventRow,
  GetEventRegisteredTicket_Count,
  UpdateEventTicketCount,
  GetJobRow,
  GetJobRegisteredTicket_Count,
  UpdateJobTicketCount,

  //function query for the clientuser
  clientuserLoginSession,
  ClientData,
  clientInformation,
  ClientMailInsert,
  GetClientSentMail,
  FetchInboxOfClient,
  NewFetchInboxClient,
  ALL_SendMaiL,
  dashboardQuery,
  filteredDashboardQuery,
  getEventRegistry,
  getJobRegistry,
  InsertTikcetCodeEvent,
  InsertTicketCodeJob,
  TicketCancelationEvent,
  TicketCancelationJob
};
