package vn.iworkspace.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({ "vn.iworkspace" })
@EnableJpaRepositories("vn.iworkspace.core.data.infrastructure.repository")
@EntityScan("vn.iworkspace.core.data.infrastructure.entity")
public class IWorkspaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(IWorkspaceApplication.class, args);
	}

}
