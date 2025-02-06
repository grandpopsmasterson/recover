package recover.project;

import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.recover.project.Recover;
import com.recover.project.controller.auth.AuthController;

@SpringBootTest(classes = Recover.class)
class RecoverTest {
    @Autowired
    private AuthController controller;

    @Test
    void contextLoads() throws Exception{
        assertThat(controller).isNotNull();
    }
}
