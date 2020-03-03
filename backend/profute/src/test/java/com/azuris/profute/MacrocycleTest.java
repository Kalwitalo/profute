package com.azuris.profute;


import com.azuris.profute.v1.model.Macrocycle;
import com.azuris.profute.v1.repository.MacrocycleRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MacrocycleTest {
    @Autowired
    private MacrocycleRepository macrocycleRepository;

    @Before
    public void setUp() throws Exception {
        Macrocycle macrocycle1= new Macrocycle("2020", "Win a regional match");
        Macrocycle macrocycle2= new Macrocycle("2020", "Win a international match");
        //save user, verify has ID value after save
        assertNull(macrocycle1.getId());
        assertNull(macrocycle2.getId());//null before save
        this.macrocycleRepository.save(macrocycle1);
        this.macrocycleRepository.save(macrocycle2);
        assertNotNull(macrocycle1.getId());
        assertNotNull(macrocycle2.getId());
    }

    @Test
    public void testFetchData(){
        /*Test data retrieval*/
        Macrocycle macrocycle1 = macrocycleRepository.findFirstByGoals("Win a regional match");
        assertNotNull(macrocycle1);
        assertEquals("2020", macrocycle1.getYear());
        /*Get all products, list should only have two*/
        int count = macrocycleRepository.findAll().size();
        assertEquals(count, 2);
    }
}
