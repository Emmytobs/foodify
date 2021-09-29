async function runner(promises: any) {
    try {
        for (const command of promises) {
            await command()
        };
    } catch (error) {
        if (error.original) {
            /**
             * This is an error that we can run into while seeding the same
             * data. It's passable.
             */

            if (error.original.code == "ER_DUP_ENTRY") {
                console.log(`>>> Passable error occurred: ER_DUP_ENTRY`)
            }
    
            /**
             * This is an error that we can run into where the same
             * field name already exists.
             */
    
            else if (error.original.code == "ER_DUP_FIELDNAME") {
                console.log(`>>> Passable error occurred: ER_DUP_FIELDNAME`)
            }
    
            /**
             * If the field doesn't exist and we're trying to drop it,
             * that's cool. We can pass this.
             */
    
            else if (error.original.code == "ER_CANT_DROP_FIELD_OR_KEY") {
                console.log(`>>> Passable error occurred: ER_CANT_DROP_FIELD_OR_KEY`)
            }
    
            else if (error.name == "SequelizeUnknownConstraintError") {
                console.log(`>>> Passable error. Trying to remove constraint that's already been removed.`)
            }
    
            /**
             * Any other error
             */
            else {
                console.log(error)
                throw new Error(error);
            }
        }
        
        else {
            console.log(error)
            throw new Error(error);
        }
    }
}

module.exports = {
    run: runner
}

// export default {
//     run: runner
// }