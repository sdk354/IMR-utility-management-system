package coms.ums.model;

import jakarta.persistence.*;

@Entity
@Table(name = "[Role]")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoleID")
    private Integer id;

    @Column(name = "RoleName", nullable = false, unique = true, length = 100)
    private String roleName;

    @Column(name = "Description")
    private String description;

    public Role() {}
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
