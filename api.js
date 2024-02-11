const express = require('express');
const bodyParser = require('body-parser');

const client = require('./connection')
const app = express();

app.use (bodyParser.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})


    // GET employee list all employee
    app.get('/employee', async function(req, res) {
        const result = await client.query('SELECT * FROM employee');
        res.json(result.rows);
    });

    // Get One Employee (with all relation to profile, family & education)
    app.get('/employee/:id', async function(req, res) {
        try {
            const { id } = req.params;
            const query = `
                SELECT
                    e.*,
                    ep.*,
                    ef.*,
                    ed.*
                FROM
                    employee e
                LEFT JOIN
                    employee_profile ep ON e.id = ep.employee_id
                LEFT JOIN
                    employee_family ef ON e.id = ef.employee_id
                LEFT JOIN
                    education ed ON e.id = ed.employee_id
                WHERE
                    e.id = $1
            `;
            const result = await client.query(query, [id]);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Create Employee and it’s profile, family, & education
    app.post('/employee', async function(req, res) {
        try {
            const { employee, profile, family, education } = req.body;

            const employeeQuery = `
                INSERT INTO employee (nik, name, is_active)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;
            const employeeValues = [employee.nik, employee.name, employee.is_active];
            const employeeResult = await client.query(employeeQuery, employeeValues);
            const employeeId = employeeResult.rows[0].id;

            const profileQuery = `
                INSERT INTO employee_profile (employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, created_by, updated_by, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
            `;
            const profileValues = [employeeId, profile.place_of_birth, profile.date_of_birth, profile.gender, profile.is_married, profile.prof_pict, profile.created_by, profile.updated_by, profile.created_at, profile.updated_at];
            await client.query(profileQuery, profileValues);

            for (const fam of family) {
                const familyQuery = `
                    INSERT INTO employee_family (employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by, updated_by, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
                `;
                const familyValues = [employeeId, fam.name, fam.identifier, fam.job, fam.place_of_birth, fam.date_of_birth, fam.religion, fam.is_life, fam.is_divorced, fam.relation_status, fam.created_by, fam.updated_by, fam.created_at, fam.updated_at];
                await client.query(familyQuery, familyValues);
            }

            for (const edu of education) {
                const educationQuery = `
                    INSERT INTO education (employee_id, name, level, description, created_by, updated_by, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `;
                const educationValues = [employeeId, edu.name, edu.level, edu.description, edu.created_by, edu.updated_by, edu.created_at, edu.updated_at];
                await client.query(educationQuery, educationValues);
            }

            res.status(201).json({ message: 'Employee created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });
  
    // Update Employee and it’s profile, family & education
    app.put('/employee/:id', async function(req, res) {
        try {
            const { id } = req.params;
            const { employee, profile, family, education } = req.body;

            const employeeQuery = `
                UPDATE employee
                SET nik = $1, name = $2, is_active = $3
                WHERE id = $4;
            `;
            const employeeValues = [employee.nik, employee.name, employee.is_active, id];
            await client.query(employeeQuery, employeeValues);

            const profileQuery = `
                UPDATE employee_profile
                SET place_of_birth = $1, date_of_birth = $2, gender = $3, is_married = $4, prof_pict = $5, updated_by = $6, updated_at = $7
                WHERE employee_id = $8;
            `;
            const profileValues = [profile.place_of_birth, profile.date_of_birth, profile.gender, profile.is_married, profile.prof_pict, profile.updated_by, profile.updated_at, id];
            await client.query(profileQuery, profileValues);

            const deleteFamilyQuery = `
                DELETE FROM employee_family
                WHERE employee_id = $1;
            `;
            await client.query(deleteFamilyQuery, [id]);

            for (const fam of family) {
                const familyQuery = `
                    INSERT INTO employee_family (employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by, updated_by, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
                `;
                const familyValues = [id, fam.name, fam.identifier, fam.job, fam.place_of_birth, fam.date_of_birth, fam.religion, fam.is_life, fam.is_divorced, fam.relation_status, fam.created_by, fam.updated_by, fam.created_at, fam.updated_at];
                await client.query(familyQuery, familyValues);
            }

            const deleteEducationQuery = `
                DELETE FROM education
                WHERE employee_id = $1;
            `;
            await client.query(deleteEducationQuery, [id]);

            for (const edu of education) {
                const educationQuery = `
                    INSERT INTO education (employee_id, name, level, description, created_by, updated_by, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `;
                const educationValues = [id, edu.name, edu.level, edu.description, edu.created_by, edu.updated_by, edu.created_at, edu.updated_at];
                await client.query(educationQuery, educationValues);
            }

            res.json({ message: 'Employee updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });

    // Delete Employee
    app.delete('/employee/:id', async function(req, res) {
        try {
            const { id } = req.params;

            const deleteEmployeeQuery = `
                DELETE FROM employee
                WHERE id = $1;
            `;
            await client.query(deleteEmployeeQuery, [id]);

            res.json({ message: 'Employee deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });


// Report Employee data
app.get('/employee/report', async function(req, res) {
    try {
      const query = `
        SELECT
            e.id AS employee_id,
            e.nik,
            e.name,
            e.is_active,
            ep.gender,
            CONCAT(DATE_PART('year', AGE(ep.date_of_birth)), ' Years Old') AS age,
            ed.name AS school_name,
            ed.level,
            CONCAT(STRING_AGG(DISTINCT CONCAT(ef.count_relation, ' ', ef.relation_status), ' & ')) AS family_data
        FROM
            employee e
        LEFT JOIN
            employee_profile ep ON e.id = ep.employee_id
        LEFT JOIN
            education ed ON e.id = ed.employee_id
        LEFT JOIN (
            SELECT
                employee_id,
                relation_status,
                COUNT(*) AS count_relation
            FROM
                employee_family
            GROUP BY
                employee_id,
                relation_status
        ) ef ON e.id = ef.employee_id
        LEFT JOIN (
            SELECT
                employee_id,
                COUNT(*) AS total_family
            FROM
                employee_family
            GROUP BY
                employee_id
        ) ef2 ON e.id = ef2.employee_id
        GROUP BY
            e.id, e.nik, e.name, e.is_active, ep.gender, ep.date_of_birth, ed.name, ed.level, ef2.total_family;
      `;
      const result = await client.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });